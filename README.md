## Readme

### Frontend development

Install node_modules dependencies with command:

```
yarn
```

Use next command to generate index.css

```
gulp styles
```

You can just open index.html to view the website.

### Test assignment

#### Part 1

The main goal of the test assignment is to check your skills of the Craft CMS and how quickly you can learn.
Make sure to read [Craft CMS documentation](https://docs.craftcms.com/v3/) before you start. If you are using PHPStorm, check out [this article](https://nystudio107.com/blog/auto-complete-craft-cms-3-apis-in-twig-with-phpstorm) as well.
For this assignment you will have to implement this one-page website in Craft CMS.

Create this assignment in a __private__ repository in Github. If you don't have private repositories, you can use GitLab.
Share the repo with @karensg, @umkasanki (usernames are the same on Github and Gitlab).

General requirements:
- Use the latest Craft CMS version.
- Deploy the website on [Hyperlane](https://hyperlane.co/) or any other hosting of your choice.

Website requirements:
- Make sure to make everything on the website editable.
- Make sure to use Sections, Entries and other Craft functionalities according to best practices.
- Make sure that the order of the blocks on the home page can be easily moved in order in the CMS.
- Make sure to install and configure the following plugins: SEOMatic, Blitz and 1 more plugin which you think might be useful.

#### Part 2 (bonus)

The goal of the second part is to check your level of understanding of Yii2 modules.

- Read the following documentation: https://docs.craftcms.com/v3/extend/module-guide.html
- Create a custom module with some simple functionality containing at least 1 Model, 1 Controller and 1 View. It does not matter what it is exactly.
- Display some data on the homepage which is made available through your custom module.
- Call the action from the homepage which is made available through your custom module.
