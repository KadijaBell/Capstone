import SignupFormModal from '../../components/SignupFormModal';

function SignupFormPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight px-4">
      <div className="max-w-md w-full bg-ivory rounded-lg shadow-xl p-8">
        <SignupFormModal isPage={true} />
      </div>
    </div>
  );
}


export default SignupFormPage;
