import React from 'react'
import { useForm } from 'react-hook-form'
import { resetPassword } from '../apis/authApi';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface FormData {
    email: string,
}

export const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormData>();
    const [newPass, setNewPass] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    const onSubmit = handleSubmit(async (formData: FormData) => {
        try {
            const { data } = await resetPassword(formData.email);
            const { password } = data;
            navigator.clipboard.writeText(password).then(function() {
                console.log('Async: Copying to clipboard was successful!');
                }, function(err) {
                console.error('Async: Could not copy text: ', err);
            });
            setNewPass(password);
            setSuccess(true);
        } catch (error) {
            setError(true);
        }
    });

    const handleClose = () => {
        navigate('/login');
    };

    const handleCloseErr = () => {
        setError(false)
    };


    return (
        <>
            <Dialog
                open={success}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Password is reset"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Your new password is "{newPass}". Password is copied to your clipboard.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Continue</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={error}
                onClose={handleCloseErr}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Error on Password Reset"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        There is some problem when resetting your account password. Please try again.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseErr}>Close</Button>
                </DialogActions>
            </Dialog>
            <div className="bg-grey-50 flex flex-col justify-center">
                <div className='mt-6 max-w-ad w-full mx-auto'>
                    <div className="max-w-ad w-3/5 mx-auto">
                        <div className='text-3xl font-bold text-gray-900 mt-2 text-center'>
                            Reset Password
                        </div>
                        <div className='max-w-ad w-full mx-auto mt-4 bg-white p-8 border border-grey-300'>
                            <form action="" className='space-y-6' onSubmit={onSubmit}>
                                <div>
                                    <label className='text-sm font-blod text-gray-600 block'>Email</label>
                                    <input type="text" {...register('email')} name="email" className='w-full p-2 border border-gray-300 rounded mt-1' />
                                </div>
                                <div>
                                    <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
