'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class set_time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  set_time.init({
    set_time_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    event_id: DataTypes.INTEGER,
    band_id: DataTypes.INTEGER,
    stage_id: DataTypes.INTEGER,
    start_time:  {
        type: DataTypes.DATE,
        timestamps: false,
        allowNull: false
    },
    end_time:  {
        type: DataTypes.DATE,
        timestamps: false,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'set_time',
  });
  return set_time;
};