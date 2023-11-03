routerAdd("POST", "/payment-intent/:userId", (c) => {
    const userId = c.pathParam("userId")

    // check if user exists
    const user = $app.dao().findRecordById("users", userId)

    if (!user) {
        return c.string(404, "User not found")
    }

    // get subscription value (first record on collection)
    const subscriptions = arrayOf(new DynamicModel({
        unitPrice: 0,
        quantity: 0,
    }))

    $app.dao().db()
    .newQuery("SELECT unitPrice, quantity FROM subscription")
    .all(subscriptions)

    
    if (subscriptions.length === 0) {
        return c.string(404, "Subscription not found")
    }

    const subscription = subscriptions[0]

    // parse data for create payment
    const res = $http.send({
        url: "https://api.openpix.com.br/api/v1/charge",
        method: "POST",
        body: JSON.stringify({
            correlationID: `${userId}-${Date.now()}`,
            value: subscription.unitPrice * subscription.quantity * 100,
            comment: "CoffeeBreak",
            expiresIn: 600000, // 10 minutes
            additionalInfo: [
                {
                    key: "userId",
                    value: userId
                }
            ]
        }),
        headers: {
            "content-type": "application/json",
            Authorization: process.env.OPENPIX_TOKEN,
        },
        timeout: 120,
    })

    // check if request was successful
    if (res.statusCode !== 200) {
        return c.string(500, "Internal server error")
    }

    // create payment intent on database
    const payments = $app.dao().findCollectionByNameOrId("payments")

    const record = new Record(payments, {
        user: userId,
        unitPrice: subscription.unitPrice,
        value: subscription.unitPrice * subscription.quantity,
        quantity: subscription.quantity,
        status: "pending",
        correlationID: res.json.correlationID,
    })

    // save record
    $app.dao().saveRecord(record)

    // reponse with correlationID, pix image url and brCode
    return c.json(200, {
        pixImage: res.json.charge.qrCodeImage,
        brCode: res.json.brCode,
        paymentLinkUrl: res.json.charge.paymentLinkUrl,
        value: res.json.charge.value,
        expiresIn: res.json.charge.expiresIn,
    })
})
