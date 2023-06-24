'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meet_greet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Meet_greet.init({
    meet_greet_id:{type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
    event_id: DataTypes.INTEGER,
    band_id: DataTypes.INTEGER,
    meet_start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        timestamps: false
    },
    meet_end_time: {
        type: DataTypes.DATE,
        allowNull: false,
        timestamps: false,
    }
    }, {
    sequelize,
    modelName: 'Meet_greet',
  });
  return Meet_greet;
};