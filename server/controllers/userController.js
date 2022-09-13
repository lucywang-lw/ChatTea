const User = require("../model/userModel");
const bcrypt = require("bcrypt");


module.exports.register = async (req, res, next ) => {
    try {
    const { username, email, password } = req.body;
    const validateUserName = await User.findOne({ username });
    if (validateUserName) {
        return res.json({msg: "Username already used", valid: false});
    }
    const validateEmail = await User.findOne({ email });
    if (validateEmail) {
        return res.json({msg: "Email already used", valid: false});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create( {
        email,
        username,
        password: hashedPassword,
    });
    delete user.password;
    return res.json({ valid: true, user });
    } catch (ex) {
        next(ex);
    }
    
};

module.exports.login = async (req, res, next ) => {
    try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.json({msg: "Username or password is incorrect.", valid: false});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.json({msg: "Username or password is incorrect.", valid: false});
    }
    delete user.password;
    
    return res.json({ valid: true, user });
    } catch (ex) {
        next(ex);
    }
    
};


module.exports.setAvatar = async (req, res, next ) => {
    try {
        const userId = req.params.id;
        console.log(userId);
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage,   
        },
        { new: true });
        console.log("userData: ", userData);
        console.log("isAvatarImageSet: ", userData.isAvatarImageSet);
        return res.json({
            isSet: userData.isAvatarImageSet, 
            image: userData.avatarImage,
        });
    } catch(ex) {
        next(ex);
    }
};

module.exports.getAllUsers = async (req, res, next ) => {
    try {
        const users = await User.find({_id:{$ne:req.params.id} }).select([   // select all users except current
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        return res.json(users);
    } catch(ex) {
        next(ex);
    };
 };