#!/usr/bin/env python3
"""
Backend API Test Suite for Medical Reference Guide
Tests all backend endpoints at the external URL
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL from frontend/.env
BASE_URL = "https://med-masterbook.preview.emergentagent.com/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'

def print_test(name, passed, details=""):
    status = f"{Colors.GREEN}✓ PASS{Colors.RESET}" if passed else f"{Colors.RED}✗ FAIL{Colors.RESET}"
    print(f"{status} - {name}")
    if details:
        print(f"  {details}")
    return passed

def test_config_endpoint():
    """Test GET /api/config - should return product info and razorpay_enabled=false"""
    print(f"\n{Colors.BLUE}Testing GET /api/config{Colors.RESET}")
    try:
        response = requests.get(f"{BASE_URL}/config", timeout=10)
        
        if response.status_code != 200:
            return print_test("GET /api/config returns 200", False, 
                            f"Expected 200, got {response.status_code}")
        
        data = response.json()
        
        # Check all required fields
        checks = []
        checks.append(print_test("Config has 'product' field", 
                                "product" in data and isinstance(data["product"], str),
                                f"product: {data.get('product')}"))
        
        checks.append(print_test("Config has 'price' = 299", 
                                data.get("price") == 299,
                                f"price: {data.get('price')}"))
        
        checks.append(print_test("Config has 'currency' = 'INR'", 
                                data.get("currency") == "INR",
                                f"currency: {data.get('currency')}"))
        
        checks.append(print_test("Config has 'razorpay_enabled' = false", 
                                data.get("razorpay_enabled") == False,
                                f"razorpay_enabled: {data.get('razorpay_enabled')}"))
        
        checks.append(print_test("Config has 'key_id' = empty string", 
                                data.get("key_id") == "",
                                f"key_id: '{data.get('key_id')}'"))
        
        return all(checks)
        
    except Exception as e:
        return print_test("GET /api/config", False, f"Exception: {str(e)}")

def test_create_order_disabled():
    """Test POST /api/payment/create-order - should return 503 when keys are empty"""
    print(f"\n{Colors.BLUE}Testing POST /api/payment/create-order (disabled){Colors.RESET}")
    try:
        payload = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+919876543210"
        }
        response = requests.post(f"{BASE_URL}/payment/create-order", 
                                json=payload, timeout=10)
        
        if response.status_code != 503:
            return print_test("POST /api/payment/create-order returns 503", False,
                            f"Expected 503 (disabled), got {response.status_code}")
        
        data = response.json()
        has_detail = "detail" in data and "not configured" in data["detail"].lower()
        
        return print_test("POST /api/payment/create-order returns 503 with detail message", 
                         has_detail,
                         f"detail: {data.get('detail')}")
        
    except Exception as e:
        return print_test("POST /api/payment/create-order", False, f"Exception: {str(e)}")

def test_verify_payment_disabled():
    """Test POST /api/payment/verify - should return 503 when keys are empty"""
    print(f"\n{Colors.BLUE}Testing POST /api/payment/verify (disabled){Colors.RESET}")
    try:
        payload = {
            "razorpay_order_id": "order_x",
            "razorpay_payment_id": "pay_x",
            "razorpay_signature": "sig_x"
        }
        response = requests.post(f"{BASE_URL}/payment/verify", 
                                json=payload, timeout=10)
        
        if response.status_code != 503:
            return print_test("POST /api/payment/verify returns 503", False,
                            f"Expected 503 (disabled), got {response.status_code}")
        
        data = response.json()
        has_detail = "detail" in data and "not configured" in data["detail"].lower()
        
        return print_test("POST /api/payment/verify returns 503 with detail message", 
                         has_detail,
                         f"detail: {data.get('detail')}")
        
    except Exception as e:
        return print_test("POST /api/payment/verify", False, f"Exception: {str(e)}")

def test_get_order_not_found():
    """Test GET /api/order/{id} - should return 404 for unknown order"""
    print(f"\n{Colors.BLUE}Testing GET /api/order/{{id}} (not found){Colors.RESET}")
    try:
        random_id = "some-random-id-12345"
        response = requests.get(f"{BASE_URL}/order/{random_id}", timeout=10)
        
        if response.status_code != 404:
            return print_test("GET /api/order/{unknown_id} returns 404", False,
                            f"Expected 404, got {response.status_code}")
        
        data = response.json()
        has_detail = "detail" in data and "not found" in data["detail"].lower()
        
        return print_test("GET /api/order/{unknown_id} returns 404 with detail", 
                         has_detail,
                         f"detail: {data.get('detail')}")
        
    except Exception as e:
        return print_test("GET /api/order/{id}", False, f"Exception: {str(e)}")

def test_download_not_found():
    """Test GET /api/download/{id}?token=xxx - should return 404 for unknown order"""
    print(f"\n{Colors.BLUE}Testing GET /api/download/{{id}} (not found){Colors.RESET}")
    try:
        random_id = "some-random-id-12345"
        response = requests.get(f"{BASE_URL}/download/{random_id}?token=abc", timeout=10)
        
        if response.status_code != 404:
            return print_test("GET /api/download/{unknown_id} returns 404", False,
                            f"Expected 404, got {response.status_code}")
        
        data = response.json()
        has_detail = "detail" in data and "not found" in data["detail"].lower()
        
        return print_test("GET /api/download/{unknown_id} returns 404 with detail", 
                         has_detail,
                         f"detail: {data.get('detail')}")
        
    except Exception as e:
        return print_test("GET /api/download/{id}", False, f"Exception: {str(e)}")

def test_leads_create_and_list():
    """Test POST /api/leads and GET /api/leads - should work normally"""
    print(f"\n{Colors.BLUE}Testing POST /api/leads (create){Colors.RESET}")
    
    # Create a lead
    try:
        payload = {
            "name": "Lead User",
            "email": "lead@example.com",
            "phone": "+919812345678",
            "source": "landing_buy"
        }
        response = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        
        if response.status_code != 200:
            return print_test("POST /api/leads returns 200", False,
                            f"Expected 200, got {response.status_code}")
        
        data = response.json()
        
        checks = []
        checks.append(print_test("Created lead has 'id' field (UUID)", 
                                "id" in data and len(data["id"]) > 0,
                                f"id: {data.get('id')}"))
        
        checks.append(print_test("Created lead echoes 'name'", 
                                data.get("name") == payload["name"],
                                f"name: {data.get('name')}"))
        
        checks.append(print_test("Created lead echoes 'email'", 
                                data.get("email") == payload["email"],
                                f"email: {data.get('email')}"))
        
        checks.append(print_test("Created lead echoes 'phone'", 
                                data.get("phone") == payload["phone"],
                                f"phone: {data.get('phone')}"))
        
        checks.append(print_test("Created lead echoes 'source'", 
                                data.get("source") == payload["source"],
                                f"source: {data.get('source')}"))
        
        lead_id = data.get("id")
        
        # List leads
        print(f"\n{Colors.BLUE}Testing GET /api/leads (list){Colors.RESET}")
        response = requests.get(f"{BASE_URL}/leads", timeout=10)
        
        if response.status_code != 200:
            checks.append(print_test("GET /api/leads returns 200", False,
                                    f"Expected 200, got {response.status_code}"))
            return all(checks)
        
        leads = response.json()
        checks.append(print_test("GET /api/leads returns a list", 
                                isinstance(leads, list),
                                f"Type: {type(leads)}"))
        
        # Check if our lead is in the list
        found = any(lead.get("id") == lead_id for lead in leads)
        checks.append(print_test("GET /api/leads includes the created lead", 
                                found,
                                f"Found lead with id: {lead_id}"))
        
        return all(checks)
        
    except Exception as e:
        return print_test("POST/GET /api/leads", False, f"Exception: {str(e)}")

def test_leads_validation():
    """Test POST /api/leads with invalid email - should return 422"""
    print(f"\n{Colors.BLUE}Testing POST /api/leads (validation){Colors.RESET}")
    try:
        payload = {
            "name": "Invalid Lead",
            "email": "not-an-email",  # Invalid email
            "phone": "+919812345678",
            "source": "landing_buy"
        }
        response = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        
        if response.status_code != 422:
            return print_test("POST /api/leads with invalid email returns 422", False,
                            f"Expected 422, got {response.status_code}")
        
        return print_test("POST /api/leads with invalid email returns 422", True,
                         "Validation working correctly")
        
    except Exception as e:
        return print_test("POST /api/leads validation", False, f"Exception: {str(e)}")

def main():
    print(f"\n{Colors.YELLOW}{'='*70}{Colors.RESET}")
    print(f"{Colors.YELLOW}Medical Reference Guide - Backend API Test Suite{Colors.RESET}")
    print(f"{Colors.YELLOW}Testing URL: {BASE_URL}{Colors.RESET}")
    print(f"{Colors.YELLOW}{'='*70}{Colors.RESET}")
    
    results = []
    
    # Run all tests
    results.append(("Config endpoint", test_config_endpoint()))
    results.append(("Create order (disabled)", test_create_order_disabled()))
    results.append(("Verify payment (disabled)", test_verify_payment_disabled()))
    results.append(("Get order (not found)", test_get_order_not_found()))
    results.append(("Download (not found)", test_download_not_found()))
    results.append(("Leads create and list", test_leads_create_and_list()))
    results.append(("Leads validation", test_leads_validation()))
    
    # Summary
    print(f"\n{Colors.YELLOW}{'='*70}{Colors.RESET}")
    print(f"{Colors.YELLOW}TEST SUMMARY{Colors.RESET}")
    print(f"{Colors.YELLOW}{'='*70}{Colors.RESET}")
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for name, result in results:
        status = f"{Colors.GREEN}✓ PASS{Colors.RESET}" if result else f"{Colors.RED}✗ FAIL{Colors.RESET}"
        print(f"{status} - {name}")
    
    print(f"\n{Colors.YELLOW}Total: {passed}/{total} tests passed{Colors.RESET}")
    
    if passed == total:
        print(f"{Colors.GREEN}All tests passed!{Colors.RESET}\n")
        return 0
    else:
        print(f"{Colors.RED}Some tests failed!{Colors.RESET}\n")
        return 1

if __name__ == "__main__":
    sys.exit(main())
