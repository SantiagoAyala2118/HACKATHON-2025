// import { comparePassword, hashPassword } from "../helpers/bcrypt.js";
import { signToken } from '../helpers/jwt.helper.js';
import { UserModel } from '../models/user.model.js';
// import { matchedData } from "express-validator"

export const register = async (req, res) => {
	let { nombre_completo, email, password } = req.body;
	// const {nombre, ...userData} = matchedData(req, {locations: ["body"]})

	try {
		// password = await hashPassword(userData.password)

		const newUser = new UserModel({ nombre_completo, email, password });

		await newUser.save();

		res.status(200).json({ ok: true, msg: 'Te has registrado con éxito!' });
	} catch (e) {
		if (e.code == '11000')
			res.status(400).json({
				ok: false,
				msg: `ese ${Object.keys(e.keyValue)} ya se encuentra en uso`,
			});
		res.status(500).json({ ok: false, msg: 'error interno del servidor' });
	}
};

export const login = async (req, res) => {
	// const {email, password} = matchedData(req)
	const { email, password } = req.body;

	try {
		const user = await UserModel.findOne({ email: email });
		if (!user) return res.status(404).json({ ok: false, msg: 'email no encontrado' });

		if (password != user.password)
			return res.status(401).json({ ok: false, msg: 'La contraseña es incorrecta' });

		const payload = {
			sub: user._id,
			nombre: user.nombre_completo,
		};
		const token = signToken(payload);

		res.cookie('token', token, {
			maxAge: 1000 * 60 * 60,
			httpOnly: true,
			sameSite: 'none',
		});

		res.status(200).json({ ok: true, msg: 'Bienvenido!' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ ok: false, msg: 'error interno del servidor' });
	}
};
