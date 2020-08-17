const User = require('../model/User');
const bcryptjs = require('bcryptjs');

exports.createUser = async ( req, res ) => {
    try {
        const { password, email } = req.body; 
        const userExists = await User.findOne({ email });

        if( userExists ){
            return res.status(400).json({ msg: 'El email ya ha sido registrado, por favor ingrese otro' });
        }

        const user = new User( req.body );
        const salt = await bcryptjs.genSalt( 10 );
        user.password = await bcryptjs.hashSync( password, salt );

        await user.save();
        res.json({ user });
    } catch (error) {
        console.log( error );
        res.status( 500 ).send( 'There was an error' );
    }
}

exports.getUsers = async ( req, res ) => {
    try {
        const users = await User.find();
        
        res.json({ users });
    } catch (error) {
        console.log( error );
        res.status( 500 ).send( 'There was an error' );
    }
}

exports.modifyUser = async ( req, res ) => {
    try {
        const { names, lastnames, email, password, state } = req.body;
        let user = await User.findById( req.params.id );
        const user_exists = await User.findOne({ email });

        if( !user ){
            return res.status( 404 ).json({ 'msg': 'Usuario no encontrado' });
        }

        // If the user_exists and the email isn't of the same user
        if( user_exists && user_exists.email !== user.email ){
            return res.status( 400 ).json({ 'msg': 'El email ya ha sido registrado, por favor ingrese otro' });
        }

        user.names = names; 
        user.lastnames = lastnames; 
        user.email = email; 
        user.state = state; 
        user.updatedAt = Date.now();
        
        const salt = await bcryptjs.genSalt( 10 );
        user.password = await bcryptjs.hashSync( password, salt );

        await user.save();

        res.json( user );

    } catch (error) {
        console.log( error );
        res.status( 500 ).send( 'There was an error' );
    }
}