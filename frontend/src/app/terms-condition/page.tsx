const TermsAndConditionsPage = async () => {
  "use cache";
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <p className="mb-4 text-sm text-gray-500">
        Last updated: {new Date().getFullYear()}
      </p>

      <section className="space-y-6">
        <p>
          By using this chat application, you agree to the following Terms and
          Conditions. If you do not agree, please do not use the app.
        </p>

        <div>
          <h2 className="text-xl font-semibold mb-2">1. Acceptable Use</h2>
          <p>
            You agree not to misuse the service, including harassment, spam,
            illegal activities, or attempts to disrupt the platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. User Content</h2>
          <p>
            You are responsible for the messages you send. We reserve the right
            to remove content that violates these terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Account Termination</h2>
          <p>
            We may suspend or terminate accounts that violate our rules or harm
            other users.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            4. Limitation of Liability
          </h2>
          <p>
            The service is provided &quot;as is&quot;. We are not liable for any
            damages arising from the use of this application.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Changes to Terms</h2>
          <p>
            We may update these Terms at any time. Continued use of the app
            indicates acceptance of the updated terms.
          </p>
        </div>
      </section>
    </main>
  );
};

export default TermsAndConditionsPage;
