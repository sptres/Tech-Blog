const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

module.exports = {
  User,
  Comment,
  Post,
};
