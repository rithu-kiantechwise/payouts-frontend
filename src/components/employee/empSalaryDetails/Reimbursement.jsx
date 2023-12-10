import React, { useState } from 'react'
import { newReimbursement } from '../../../api/EmployeeApi';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../LoadingSpinner';

const Reimbursement = () => {
    const [loading, setLoading] = useState(false);
    const [inputData, setInputData] = useState({
        image: '',
        amount: '',
        description: '',
    });

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            setInputData({
                ...inputData,
                [name]: value,
            });
        } catch (error) {
            console.error('Error in handleChange:', error);
        }
    };

    const handleImageChange = async (e) => {
        try {
            const imageFile = e.target.files[0];
            setInputData({
                ...inputData,
                image: imageFile,
            });
        } catch (error) {
            console.error('Error in handleImageChange:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('image', inputData.image);
            formData.append('amount', inputData.amount);
            formData.append('description', inputData.description);
            setLoading(true)
            const response = await newReimbursement(formData);
            setLoading(false)
            if (response.data.success) {
                toast.success(response.data.message)
                setInputData({
                    image: '',
                    amount: '',
                    description: '',
                })
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {!loading
                ?
                <div className='max-w-[60%]'>
                    <h1 className='font-semibold text-2xl text-center pb-4'>Re-Imbursement Claim</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 w-96">
                            <label
                                htmlFor="formFileSm"
                                className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                            >
                                Upload related documents
                            </label>
                            <input
                                className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                id="formFileSm"
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                Amount
                            </label>
                            <div className="mt-2">
                                <input
                                    id="amount"
                                    name="amount"
                                    type="text"
                                    value={inputData.amount}
                                    required
                                    onChange={handleChange}
                                    className="appearance-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Reason
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    value={inputData.description}
                                    required
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about this claim.</p>
                        </div>
                        <div>
                            <button
                                type='submit'
                                className='text-white font-medium px-6 py-2 bg-violet-700 rounded mt-5'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                :
                <LoadingSpinner />}
        </>
    )
}

export default Reimbursement;