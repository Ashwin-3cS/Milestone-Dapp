// import  { useState } from 'react' ;
import { Link } from 'react-router-dom';
// import useLogin from '../../hooks/useLogin';


const  Login = () => {

// 	const [userName, setUsername] = useState("");
// 	const [password, setPassword] = useState("");

// 	const {loading,login} = useLogin()

// 	const handleSubmit = async (e) => {
// 	e.preventDefault();
// 	await login(userName,password)
// }
  return (
    
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto mt-[14%] '>
			<div className='w-[30%] p-6 rounded-lg shadow-lg bg-stone-400 bg-opacity-20 '>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-teal-400'> MileStones</span>
				</h1>
				<form >
					<div>
						<label className='label p-2'>
							<span className='text-base label-text '>Username</span>
						</label>
						<input type='text' placeholder='Enter username' className='w-full input input-bordered h-10'

						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'

						/>
					</div>
					<Link to={'/signup'} className='text-sm  hover:underline hover:text-teal-400 mt-2 inline-block'>
						{"Don't"} have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 rounded-md w-[50%]  ml-[130px]'  >
							{/* {loading ? <span className="loading loading-spinner"></span>: "Login"} */}
							LOGIN
						</button>
					</div>
				</form>
			</div>
		</div>
    
	);
}

export default Login