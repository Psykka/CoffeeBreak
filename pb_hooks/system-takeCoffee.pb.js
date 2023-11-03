routerAdd("POST", "/system-take-coffee", (c) => {
    const data = $apis.requestInfo(c).authRecord
    const remaining = $app.dao().findFirstRecordByData("remainingDrink", "user", data.id)

    if (!remaining) {
        return c.string(404, "User not found")
    }

    const quantity = remaining.get("quantity") - 1

    if (quantity < 0) {
        return c.string(400, "Quantity not available")
    }

    remaining.set("quantity", quantity)
    $app.dao().saveRecord(remaining)

    return c.string(200, "OK")
}, $apis.requireRecordAuth())