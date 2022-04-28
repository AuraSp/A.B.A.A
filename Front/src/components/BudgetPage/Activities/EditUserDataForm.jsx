import React, { useState } from 'react';
import { MdCancel, MdInventory, MdOutlineCheckBox } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import './activitiesmain.css';

function EditUserDataForm({ defaultData, id, subId, onCancel, onSubmit }) {
    const [description, setDescription] = useState(defaultData.description)
    const [category, setCategory] = useState(defaultData.category);
    const [date, setDate] = useState(defaultData.date);
    const [amount, setAmount] = useState(defaultData.amount);

    const editFlows = () => {
        let dataSet = {
            description: description,
            category: category,
            date: date,
            amount: amount,
        };
        onSubmit(id, subId, dataSet, defaultData)
    }

    const options = [
        { value: 'Išsiėmimas', text: 'Pinigų išsiėmimas' },
        { value: 'Drabužiai', text: 'Rūbai/Batai' },
        { value: 'Maistas/Gėrimai', text: 'Maistas/Gėrimai' },
        { value: 'Elektronika', text: 'Elektronika' },
        { value: 'Dovanos', text: 'Dovanos' },
        { value: 'Namų priežiūra', text: 'Namų priežiūra' },
        { value: 'Sąskaitos/Mokesčiai', text: 'Sąskaitos/Mokesčiai' },
        { value: 'Nuoma', text: 'Namo nuoma' },
        { value: 'Santaupos', text: 'Santaupos' }
    ]

    const budgetSchema = yup.object().shape({
        description: yup
            .string()
            .min(2, 'Galimas minimalus 2-iejų raidžių kiekis')
            .max(30, 'Galimas maksimalus 30-ties raidžių kiekis')
            .nullable(false)
            .strict()
            .required(),
        amount: yup
            .string()
            .nullable(false)
            .matches(/^[1-9]\d*(((\.\d{2}){0})?(.\d{0,2})?)$/, 'Suma tik teigiama, galimi tik skaičiai ir turi turėti dvejus skaitmenis po taško')
            .strict()
            .required(),
        date: yup
            .date()
            .nullable(false)
            .min(new Date(1989, 12, 31), 'Data negali būti senesnė nei 1989 metų')
            .max(new Date(), "Data privalo būti ne vėlesnė kaip šios dienos")
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
                <td className='fs-5 cardicons'><MdInventory className={defaultData.type === 'income' ? 'bg-primary p-1 fs-3 text-warning' : 'bg-danger p-1 fs-3 text-warning'} /></td>
                <td>

                    <input
                        {...register('description')}
                        className='w-75 text-center'
                        type='text'
                        pattern='^[A-Z0-9]{6}$'
                        defaultValue={defaultData.description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description &&
                        <p className='error1 p-1 pt-4'>{errors.description?.message}</p>}
                </td>
                <td>
                    <select
                        className='w-75 text-center'
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value={defaultData.category}>{defaultData.category}</option>
                        {options.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                        })}
                    </select>
                    {errors.category &&
                        <p className='error2 p-1 pt-4'>{errors.category?.message}</p>}
                </td>
                <td>
                    <input
                        {...register('date')}
                        className='w-75 text-center'
                        type='date'
                        defaultValue={defaultData.date.slice(0, 10)}
                        min='1989-12-31'
                        max='2030-01-01'
                        required
                        onChange={(e) => setDate(e.target.value)}>
                    </input>
                    {errors.date &&
                        <p className='error3 p-1 pt-4'>{errors.date?.message}</p>}
                </td>

                {defaultData.type === 'income' ? (
                    <>
                        <td>
                            <input
                                {...register('amount')}
                                className='w-75 text-center'
                                type='string'
                                min='0'
                                defaultValue={defaultData.amount}
                                onChange={(e) => setAmount(e.target.value)}>
                            </input>
                            {errors.amount &&
                                <p className='error4 p-1 pt-2'>{errors.amount?.message}</p>}
                        </td >
                        <td>-</td>
                    </>
                ) : (
                    <>
                        <td>-</td>
                        <td>
                            <input
                                {...register('amount')}
                                className='w-75 text-center'
                                type='string'
                                min='0'
                                defaultValue={defaultData.amount}
                                onChange={(e) => setAmount(e.target.value)}>
                            </input>
                            {errors.amount &&
                                <p className='error4 p-1 pt-2'>{errors.amount?.message}</p>}
                        </td>
                    </>
                )
                }
                < td className='editbuttons' >
                    <button onClick={() => onCancel()} className='btn btn-danger border-0 me-1' form='my_form'><MdCancel /></button>
                    <button onClick={handleSubmit(editFlows)} className='btn btn-secondary border-0 me-1' type='submit'><MdOutlineCheckBox /></button>
                </td >
            </tr >
        </>
    )
}

export default EditUserDataForm