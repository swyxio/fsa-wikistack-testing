var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');
var marked = require('marked');

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        // page.tags = 'programming,coding,javascript'
        set: function (value) {

            var arrayOfTags;

            if (typeof value === 'string') {
                arrayOfTags = value.split(',').map(function (s) {
                    return s.trim();
                });
                this.setDataValue('tags', arrayOfTags);
            } else {
                this.setDataValue('tags', value);
            }

        }
    }
}, {
    hooks: {
        beforeValidate: function (page) {
            if (page.title) {
                page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
            }
        }
    },
    getterMethods: {
        route: function () {
            return '/wiki/' + this.urlTitle;
        },
        renderedContent: function () {
            return marked(this.content);
        }
    },
    classMethods: {
        findByTag: function (tag) {
            return Page.findAll({
                where: {
                    tags: {
                        $overlap: [tag]
                    }
                }
            });
        }
    },
    instanceMethods: {
        findSimilar: function () {
            return Page.findAll({
                where: {
                    tags: {
                        $overlap: this.tags
                    },
                    id: {
                        $ne: this.id
                    }
                }
            });
        }
    }
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
    Page: Page,
    User: User
};