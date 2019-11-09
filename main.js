require("dotenv").config();

const { Builder, By, Key, until } = require("selenium-webdriver");

const baseUrl = "https://www.instagram.com";

(async function example() {
  let driver = await new Builder().forBrowser("firefox").build();
  try {
    await driver.get(`${baseUrl}/accounts/login`);
    await driver
      .wait(until.elementLocated(By.name("username")))
      .sendKeys(process.env.IG_USERNAME);
    await driver
      .wait(until.elementLocated(By.name("password")))
      .sendKeys(process.env.IG_PASSWORD);

    await driver.findElement(By.xpath("//button[@type='submit']")).click();
    const ver = await driver.wait(
      until.elementLocated(By.name("verificationCode")),
      3000
    );
    // await driver.wait(until.elementTextContains(ver, "a"), 20000);
    await driver.sleep(20000);
    await (await driver.findElement(
      By.xpath("//button[contains(text(), 'Confirm')]")
    )).click();

    await driver
      .wait(
        until.elementLocated(By.xpath("//button[contains(text(), 'Not Now')]"))
      )
      .click();
    await driver.wait(until.elementLocated(By.className("RR-M- ")));
    //By.xpath("//div[contains(div, 'Watch All')]/ancestor::a")
    await driver.sleep(2000);

    await driver.wait(until.elementLocated(By.className("bKWx4"))).click();
    await driver.wait(until.elementLocated(By.className("carul")));
    for (let i = 0; i < 10000; i++) {
      await driver.sleep(500);
      await driver
        .actions()
        .sendKeys(Key.ARROW_RIGHT)
        .sendKeys(Key.ARROW_RIGHT)
        .perform();
      // await driver
      //   .wait(
      //     until.elementLocated(By.className("ow3u_"))
      //     // By.xpath("//*[@class='coreSpriteRightChevron']/ancestor::button")
      //   )
      //   .click();
    }
  } catch (err) {
    console.log(err);
  }
})();
