routerAdd("POST", "/payment-success", (c) => {
    const data = $apis.requestInfo(c).data
    const payment = $app.dao().findFirstRecordByData("payments", "correlationID", data.charge.correlationID)

    if (!payment) {
        return c.string(404, "Payment not found")
    }

    if (payment.get("status") === "paid") {
        return c.string(200, "OK - Payment already paid")
    }

    payment.set("status", "paid")
    $app.dao().saveRecord(payment)

    let remaining

    try {
        remaining = $app.dao().findFirstRecordByData("remainingDrink", "user", payment.get("user"))
    } catch (e) {
        remaining = null
    }

    if (!remaining) {
        // create new record
        const remainingDrink = $app.dao().findCollectionByNameOrId("remainingDrink")
        const record = new Record(remainingDrink, {
            user: payment.get("user"),
            quantity: payment.get("quantity"),
        })

        $app.dao().saveRecord(record)
    } else {
        // update record
        const quantity = remaining.get("quantity") + payment.get("quantity")

        remaining.set("quantity", quantity)
        $app.dao().saveRecord(remaining)
    }

    return c.string(200, "OK")
})
