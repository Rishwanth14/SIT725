const puppeteer = require('puppeteer');

describe('Foodie Web App Tests', () => {
    let browser, page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
        await page.goto('http://localhost:3000'); // Update to your server's address
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Check if the title is correct', async () => {
        const title = await page.title();
        expect(title).toBe('Food Web App');
    });

    test('Check if navigation links exist', async () => {
        const navLinks = await page.$$eval('#nav-mobile li a', links => links.map(link => link.textContent));
        expect(navLinks).toContain('Categories');
        expect(navLinks).toContain('About Us');
        expect(navLinks).toContain('Contact');
    });

    test('Submit contact form', async () => {
      await page.type('#name', 'John Doe');
      await page.type('#email', 'john@example.com');
      await page.type('#message', 'Hello, this is a test message.');
      await page.click('button[type="submit"]');
  
      // Wait for a toast notification
      await page.waitForSelector('.toast'); // Adjust selector if needed
      const toastMessage = await page.$eval('.toast', el => el.textContent);
      expect(toastMessage).toBe('Thank you for your message!');
  });
  

  test('Rate a recipe', async () => {
    const rateButton = await page.$('.rate-recipe'); // Locate the "Rate" button
    expect(rateButton).not.toBeNull(); // Ensure the button exists
    await rateButton.click(); // Simulate a click event

    // Wait for the live updates message
    await page.waitForSelector('#live-updates', { visible: true }); // Adjust selector if needed
    const liveUpdate = await page.$eval('#live-updates span', el => el.textContent);
    expect(liveUpdate).toMatch(/Rating updated/);
});

});
