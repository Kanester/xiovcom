// -------------------------
// PASSWORD STRENGTH
// -------------------------
export function computePasswordScore(pw: string) {
	if (!pw || pw.length < 1) return 0;
	let score = 0;
	if (pw.length >= 8) score++;
	if (/[A-Z]/.test(pw)) score++;
	if (/[0-9]/.test(pw)) score++;
	if (/[^A-Za-z0-9]/.test(pw)) score++;
	return Math.min(4, score);
}

// -------------------------
// SIGNUP FORM VALIDATION
// -------------------------
export function computeSignUpDerived(email: string, password: string, confirmPassword: string) {
	const emailValid = /^\S+@\S+\.\S+$/.test(email);

	const passwordScore = computePasswordScore(password);
	const passwordStrength = passwordScore >= 3 ? 'strong' : passwordScore === 2 ? 'medium' : 'weak';

	const passwordsMatch = password && confirmPassword && password === confirmPassword;

	const formValid =
		emailValid &&
		password.length >= 6 &&
		passwordsMatch &&
		(passwordStrength === 'medium' || passwordStrength === 'strong');

	return { emailValid, passwordScore, passwordStrength, passwordsMatch, formValid };
}
