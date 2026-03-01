from playwright.sync_api import Page, expect, sync_playwright

def test_homepage(page: Page):
  page.goto("http://localhost:3000")
  page.wait_for_selector("h1")
  page.screenshot(path="/tmp/homepage.png", full_page=True)

if __name__ == "__main__":
  with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    try:
      test_homepage(page)
    finally:
      browser.close()
