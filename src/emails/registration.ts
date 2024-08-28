import keys from "../keys/index.js";
import { IRegistration } from "./registration.interface";

export default function (email: string): IRegistration {
	return {
		to: email,
		from: keys.EMAIL_FROM,
		subject: keys.SUBJECT_EMAIL,
		html: 
			`<h1>Welcome to our store</h1>
			<p>You have successfully created an account with email - ${email}</p>
			<hr/>
			<a href="${keys.BASE_URL}">Courses store</a>
		`,
	};
}
