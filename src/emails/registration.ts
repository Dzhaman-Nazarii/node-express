import keys from "../keys/index.js";
import { IEmail } from "./email.interface.js";

export default function (email: string): IEmail {
	return {
		to: email,
		from: keys.EMAIL_FROM,
		subject: keys.SUBJECT_REGISTER,
		html: 
			`<h1>Welcome to our store</h1>
			<p>You have successfully created an account with email - ${email}</p>
			<hr/>
			<a href="${keys.BASE_URL}">Courses store</a>
		`,
	};
}
