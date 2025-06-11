const bcrypt = require('bcrypt');
const { User } = require('../models');
const sequelize = require('../config/db');

(async () => {
    await sequelize.sync();

    const hashedPassword1 = await bcrypt.hash('adminexpo', 10);
    const hashedPassword2 = await bcrypt.hash('puertaexpo', 10);

    await User.findOrCreate({
        where: { username: 'admin' },
        defaults: { password: hashedPassword1, role: 'admin' }
    });
    await User.findOrCreate({
        where: { username: 'puerta' },
        defaults: { password: hashedPassword2, role: 'door' }
    });

    console.log('Usuarios creados exitosamente');
    await sequelize.close();
})();