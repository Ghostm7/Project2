// module.exports = (sequelize, DataTypes) => {
//     const Reg = sequelize.define('registration', {
//         reg_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         regName: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         regEmail: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         regPassword: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//     });
    
//     return Reg;


//     // Function to hash password before saving
//     Reg.beforeCreate( async (user) => {
//         try {
//             const salt = await bcrypt.genSalt(12);
//             const hashedPwd = await bcrypt.hash(user.regPassword, salt)
//             user.regPassword = hashedPwd;
//         } catch (error) {
//             throw new Error("Error encrypting password")
//         }
//     })

//     // Function to compare the entered password with the saved hashed password
//     Reg.prototype.isValidPassword = async function(password) {
//         try {
//             return await bcrypt.compare(password, this.password);
//         } catch (error) {
//             throw error;
//         }
//     };
// }
    

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const Reg = sequelize.define('registration', {
        reg_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        regName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        regEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        regPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        hooks: {
            // Hook before creating a new instance of the Reg model
            beforeCreate: async (reg) => {
                try {
                    const salt = await bcrypt.genSalt(12);
                    const hashedPwd = await bcrypt.hash(reg.regPassword, salt);
                    reg.regPassword = hashedPwd;
                } catch (error) {
                    throw new Error("Error encrypting password");
                }
            }
        }
    });
    
    // Function to compare the entered password with the saved hashed password
    Reg.prototype.isValidPassword = async function(password) {
        try {
            return await bcrypt.compare(password, this.regPassword);
        } catch (error) {
            throw error;
        }
    };

    return Reg;
};
