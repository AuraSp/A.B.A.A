import React, { useState, useEffect } from 'react';
import { MdCancel, MdInventory, MdOutlineCheckBox } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


// import './Styles/edit.css';

function EditUserList({ defaultData, onCancel, subId, onSubmit }) {
    const [username, setUsername] = useState(defaultData.username);
    const [email, setEmail] = useState(defaultData.email);
    const [password, setPassword] = useState(defaultData.password);
    const [role, setRole] = useState(defaultData.roles);

    const [editpopup, setEditPopUp] = useState(false);

    let createdAt = defaultData.createdAt;
    let data = createdAt.substr(0, 10);
    const toggleEditPopUp = () => {
        setEditPopUp(!editpopup)
    }

    const editFlows = () => {
        
        let userSet = {
            username: username,
            email: email,
            password: password,
            roles: role
        };
        console.log(userSet.roles)
        onSubmit(subId, userSet, defaultData)
    }

    // let [categories, setCategories] = useState([]);

    // const getAllCategories = async () => {
    //     fetch('http://localhost:3000/api/v1/categories')
    //     .then(res => res.json())
    //     .then((json) => {
    //         setCategories(json.data.categories);
    //     })
    // }

    // useEffect( ()=>{
    //     getAllCategories();
    //   }, [])

    const budgetSchema = yup.object().shape({
        username: yup
            .string()
            .min(2, 'Galimas minimalus 2-iejų raidžių kiekis')
            .max(30, 'Galimas maksimalus 30-ties raidžių kiekis')
            .transform((_, username) => {
                if (!username) {
                    return errors.username
                } else if (username.includes(' ')) {
                    return username.replace(' ', '')
                }
                return username
            })
            .nullable(false)
            .strict()
            .required()
    })


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(budgetSchema)
    });

    return (
        <>
            <tr className='editinputs text-center'>
                <td>{defaultData._id}</td>
                <td>

                    <input
                        {...register('username')}
                        className='text-center'
                        type='text'
                        defaultValue={defaultData.username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username &&
                        <p className='error1 p-1 pt-4'>{errors.username?.message}</p>}
                </td>
                <td>
                    <input
                        {...register('email')}
                        className='text-center'
                        type='email'
                        defaultValue={defaultData.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email &&
                        <p className='error1 p-1 pt-4'>{errors.email?.message}</p>}
                </td>

                <td>
                    {/* <input
                        {...register('password')}
                        type='text'
                        defaultValue={defaultData.password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password &&
                        <p className='error1 p-1 pt-4'>{errors.password?.message}</p>} */}
                        {defaultData.password}
                </td>

                <td>{data}</td>

                <td>
                    <select
                        {...register('role')}
                        className='text-center'
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value={defaultData.roles}>{defaultData.roles}</option>
                        <option>user</option>;
                        <option>admin</option>;
                        
                    </select>
                    {errors.role &&
                        <p className='error2 p-1 pt-4'>{errors.role?.message}</p>}
                </td>
                
                <td className='editbuttons'>
                    <button onClick={() => onCancel()} className='btn border-0 me-1'><MdCancel /></button>
                    <button onClick={handleSubmit(editFlows)} className='btn border-0 me-1' type='submit'><MdOutlineCheckBox /></button>
                    <button onClick={toggleEditPopUp} className='btn bg-transparent text-dark'>...</button>
                    {editpopup &&
                        <div className='tools-content'>
                            <div>
                                <button onClick={() => onCancel()} className='btn bg-transparent border-0'><MdCancel className='text-danger me-3' />
                                    <span className='text-secondary'>Atšaukti</span>
                                </button>
                            </div>
                            <div>
                                <button onClick={handleSubmit(editFlows)} className='btn bg-transparent border-0'><MdOutlineCheckBox className='text-primary me-3' />
                                    <span className='text-secondary'>Koreguoti</span>
                                </button>
                            </div>
                        </div>
                    }
                </td >
            </tr >
        </>
    )
}

export default EditUserList