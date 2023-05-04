const { Model, DataTypes, Sequelize }= require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    role : {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'custumer',
    },
    //en JS se llama createAt
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        // en sql se va a llamar asi:
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW,
    },
    recoveryToken: {
      field: 'recovery_token',
      allowNull: true,
      type: DataTypes.STRING,
    },
};

// Model es la clase de donde extiende las querys
class User extends Model {

  static associate(models) {
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId'
    })}

  // configuracion
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User}
