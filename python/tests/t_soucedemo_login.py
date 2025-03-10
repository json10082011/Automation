import pytest
import os
from playwright.sync_api import sync_playwright
from pages.p_soucedemo_login import LoginPage
from pages.inventory_page import InventoryPage

# Credentials
USERS = [
    "standard_user",
    "locked_out_user",
    "problem_user",
    "performance_glitch_user",
    "error_user",
    "visual_user"
]
PASSWORD = "secret_sauce"
URL = "https://www.saucedemo.com/"

# Create directories for debugging assets
os.makedirs("screenshots", exist_ok=True)
os.makedirs("traces", exist_ok=True)

@pytest.fixture(scope="function")
def browser():
    with sync_playwright() as p:
        # browser = p.chromium.launch(headless=False)  # Change to True for headless execution
        browser = p.chromium.launch(headless=False)
        yield browser
        browser.close()

@pytest.mark.parametrize("username", USERS)
def test_saucedemo_login(browser, username):
    context = browser.new_context()
    page = context.new_page()
    
    # Enable tracing for debugging
    context.tracing.start(screenshots=True, snapshots=True, sources=True)

    # Instantiate Page Objects
    login_page = LoginPage(page)
    inventory_page = InventoryPage(page)

    try:
        login_page.navigate(URL)
        login_page.login(username, PASSWORD)

        if username == "locked_out_user":
            # Verify locked out error message
            error_text = login_page.get_error_message()
            assert "locked out" in error_text.lower(), f"Expected error for {username}, got: {error_text}"
        else:
            # Verify successful login
            assert inventory_page.is_logged_in(), f"{username} failed to login"

    except AssertionError as e:
        # Capture screenshot on failure
        screenshot_path = f"screenshots/{username}_failure.png"
        page.screenshot(path=screenshot_path)
        print(f"📸 Screenshot saved: {screenshot_path}")

        # Capture trace on failure
        trace_path = f"traces/{username}_trace.zip"
        context.tracing.stop(path=trace_path)
        print(f"📊 Trace saved: {trace_path}")

        pytest.fail(str(e))

    finally:
        context.tracing.stop()
        context.close()
