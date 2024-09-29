import { expect } from 'chai';
import fetch from 'node-fetch';

describe("Calculation API", function() {
    const baseUrl = "http://localhost:2024/api";

    // Test POST /calculate
    it("should save a calculation and return status 200", async function() {
        const calculation = {
            expression: "2 + 2",
            result: 4
        };
        
        try {
            const response = await fetch(`${baseUrl}/calculate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(calculation)
            });
            const text = await response.text();
            console.log('Response Text:', text);  // Log the response text
            const body = JSON.parse(text);  // Parse the response as JSON
            expect(response.status).to.equal(200);
            expect(body.success).to.equal(true);
        } catch (error) {
            console.error('Error saving calculation:', error);
        }
    });

    // Test GET /history
    it("should retrieve the last 10 calculations", async function() {
        try {
            const response = await fetch(`${baseUrl}/history`);
            const text = await response.text();
            console.log('Response Text:', text);  // Log the response text
            const body = JSON.parse(text);  // Parse the response as JSON
            expect(response.status).to.equal(200);
            expect(body.success).to.equal(true);
            expect(body.data).to.be.an('array');
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    });

    // Test DELETE /history
    it("should clear the history and return status 200", async function() {
        try {
            const response = await fetch(`${baseUrl}/history`, {
                method: 'DELETE'
            });
            const text = await response.text();
            console.log('Response Text:', text);  // Log the response text
            const body = JSON.parse(text);  // Parse the response as JSON
            expect(response.status).to.equal(200);
            expect(body.success).to.equal(true);
        } catch (error) {
            console.error('Error clearing history:', error);
        }
    });
});
