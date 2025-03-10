from playwright.sync_api import Page

class InventoryPage:
    def __init__(self, page: Page):
        self.page = page
        self.inventory_url = "https://www.saucedemo.com/inventory.html"

    def is_logged_in(self):
        return self.page.url == self.inventory_url
