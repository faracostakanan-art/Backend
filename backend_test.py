import requests
import sys
import json
from datetime import datetime

class CerticodeAPITester:
    def __init__(self, base_url="https://vault-sg.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2)}")
                except:
                    print(f"Response text: {response.text}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text}")

            return success, response.json() if response.headers.get('content-type', '').startswith('application/json') else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_endpoint(self):
        """Test health endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )

    def test_root_endpoint(self):
        """Test root endpoint"""
        return self.run_test(
            "Root Endpoint",
            "GET",
            "api/",
            200
        )

    def test_certicode_submission(self):
        """Test certicode submission endpoint"""
        test_data = {
            "identifier": "1234567890",
            "password": "123456",
            "first_name": "Jean",
            "last_name": "Dupont",
            "date_of_birth": "1990-01-01",
            "phone_number": "0123456789"
        }
        
        return self.run_test(
            "Certicode Submission",
            "POST",
            "api/certicode/submit",
            200,
            data=test_data
        )

    def test_certicode_submission_minimal(self):
        """Test certicode submission with minimal data"""
        test_data = {
            "identifier": "9876543210",
            "password": "654321"
        }
        
        return self.run_test(
            "Certicode Submission (Minimal)",
            "POST",
            "api/certicode/submit",
            200,
            data=test_data
        )

def main():
    print("🚀 Starting La Banque Postale Certicode Plus API Tests")
    print("=" * 60)
    
    tester = CerticodeAPITester()

    # Test basic endpoints
    tester.test_health_endpoint()
    tester.test_root_endpoint()
    
    # Test certicode submission
    tester.test_certicode_submission()
    tester.test_certicode_submission_minimal()

    # Print results
    print("\n" + "=" * 60)
    print(f"📊 Tests completed: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("❌ Some tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())