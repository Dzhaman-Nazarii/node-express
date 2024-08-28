import keys from "../keys/index.js";
import { IEmail } from "./email.interface";

export default function (email: string, token: string): IEmail {
	return {
		to: email,
		from: keys.EMAIL_FROM,
		subject: keys.SUBJECT_RESET,
		html: 
			`<h1>You forget password</h1>
			<p>If not, ignore this letter</p>
			<p>Otherwise, click on the link below:</p>
			<p><a href="${keys.BASE_URL}/auth/password/${token}">Restore access</a></p>
			<hr/>
			<a href="${keys.BASE_URL}">Courses store</a>
		`,
	};
}
