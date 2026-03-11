#test 1 negative usd_amount
def test_negative_usd_amount(client):
    response = client.post("/convert", json={
        "usd_amount": -10,
        "rate": 150,
        "rate_source": "Manual",
        "conversion_date": "2026-03-10"
    })
    assert response.status_code == 400

#test2 rounding correctness
def test_rounding_correctness(client):
    response = client.post("/convert", json={
        "usd_amount": 10,
        "rate": 154.39,
        "rate_source": "Manual",
        "conversion_date": "2026-03-10"
    })
    data = response.json()
    assert response.status_code == 200
    assert data["jpy_amount"] == 1544

#test3 history contains conversion
def test_create_and_history_contains_conversion(client):
    create_response = client.post("/convert", json={
        "usd_amount": 10,
        "rate": 150,
        "rate_source": "Manual",
        "conversion_date": "2026-03-10"
    })
    assert create_response.status_code == 200
    history_response = client.get("/conversions")
    assert history_response.status_code == 200
    data = history_response.json()
    assert len(data) > 0

#test4 conversion not found
def test_conversion_not_found(client):
    response = client.get("/conversions/999999")
    assert response.status_code == 404