'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsFolder } from 'react-icons/bs';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ActionMeta } from 'react-select';
import LottieAnimation from '@/components/animation/configAnimation';
import animationData from '../../assets/animations/animation_ln1zz6z5.json';
import { Option, customStyles, ClearIndicator, CustomSelect, CustomOption } from '../../components/selectReact/constructor';
import FloatingLabelInput from '@/components/LabelFloat/float';
import { validateDescription, validateEmail, validateFile, validateName, validatePhone, validateSector, validateTitle, validateType } from '@/components/validation/formValidation';


const RequestForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        description: '',
        file: null as File | null,
        sector: '',
        type: '',
        title: ''
    });

    const [error, setError] = useState<string | null>(null);
    const [fileSelected, setFileSelected] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [selectedSector, setSelectedSector] = useState<CustomOption | null>(null);
    const [sectorOptions, setSectorOptions] = useState<CustomOption[]>([]);
    const [selectedOption, setSelectedOption] = useState<CustomOption | null>(null);
    const [animationShown, setAnimationShown] = useState(false);
    const [typeOptions, setTypeOptions] = useState<CustomOption[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleValidation = () => {
        const errors: string[] = [];
        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);
        const phoneError = validatePhone(formData.phone);
        const sectorError = validateSector(selectedSector?.value || '');
        const typeError = validateType(selectedOption?.value || '');
        const titleError = validateTitle(formData.title);
        const descriptionError = validateDescription(formData.description);
        const fileError = validateFile(formData.file);

        if (nameError) errors.push(nameError);
        if (emailError) errors.push(emailError);
        if (phoneError) errors.push(phoneError);
        if (sectorError) errors.push(sectorError);
        if (typeError) errors.push(typeError);
        if (titleError) errors.push(titleError);
        if (descriptionError) errors.push(descriptionError);
        if (fileError) errors.push(fileError);

        setErrorMessages(errors);
        setAnimationShown(errors.length > 0); 
    };

    const [windowWidth, setWindowWidth] = useState<number>(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (file) {
            const fileValidationError = validateFile(file);

            if (fileValidationError) {
                toast.dismiss();
                toast.error(fileValidationError);
                setFormData((prevData) => ({
                    ...prevData,
                    file: null,
                }));
                setFileSelected(false);
                setSelectedFileName(null);
                setFileUrl(null);
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    file,
                }));
                setFileSelected(true);
                setSelectedFileName(file.name);
                const fileUrl = URL.createObjectURL(file);
                setFileUrl(fileUrl);
            }
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            setFormData((prevData) => ({
                ...prevData,
                file,
            }));
            setFileSelected(true);
            setSelectedFileName(file.name);
        }
    };

    useEffect(() => {
        const fetchSectorOptions = async () => {
            try {
                const response = await axios.get('http://localhost:3001/setor');
                const data = response.data;
                const formattedOptions = data.map((option: any) => ({
                    value: option.nome, 
                    label: option.nome, 
                }));
                setSectorOptions(formattedOptions);
            } catch (error) {
                console.error('Erro ao buscar opções de setor:', error);
            }
        };
        fetchSectorOptions();
    }, []);


    const handleSelectChangeSector = (selectedOption: CustomOption | null, actionMeta: ActionMeta<any>) => {
        if (actionMeta.action === 'select-option') {
            setSelectedSector(selectedOption);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/tipoTicket')
            .then(response => {
                const mappedOptions = response.data.map((option: { nome: any; descritivo: any; }) => ({
                    value: option.nome,
                    label: option.nome,
                    description: option.descritivo,
                }));
                setTypeOptions(mappedOptions);
            })
            .catch(error => {
                console.error('Erro ao buscar opções de tipo de ticket:', error);
            });
    }, []);

    const handleSelectChange = (selectedOption: CustomOption | null, actionMeta: ActionMeta<any>) => {
        if (actionMeta.action === 'select-option') {
            setFormData((prevData) => ({
                ...prevData,
                type: selectedOption?.value || '',
            }));
        }
    };
    const clearFormFields = () => {
        setFormData({
            ...formData,
            name: '',
            email: '',
            phone: '',
            description: '',
            file: null,
            sector: '',
            type: '',
            title: ''
        });
        setErrors({
            name: null,
            email: null,
            phone: null,
            description: null,
            file: null,
            sector: null,
            type: null,
            title: null
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData)
        handleValidation();
        const addFieldToFormData = (formData: FormData, fieldName: string, fieldValue: string) => {
            if (fieldValue) {
                formData.append(fieldName, fieldValue);
            }
        };
        const formDataToSend = new FormData();

        addFieldToFormData(formDataToSend, 'name', formData.name);
        addFieldToFormData(formDataToSend, 'email', formData.email);
        addFieldToFormData(formDataToSend, 'phone', formData.phone);
        addFieldToFormData(formDataToSend, 'description', formData.description);
        addFieldToFormData(formDataToSend, 'sector', formData.sector);
        addFieldToFormData(formDataToSend, 'type', formData.type);
        addFieldToFormData(formDataToSend, 'title', formData.title);

        if (formData.file) {
            formDataToSend.append('file', formData.file);
        }
        try {
            const response = await axios.post('http://localhost:3001/formulario', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Resposta do servidor:', response);
            if (response.status === 200) {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    description: '',
                    file: null,
                    sector: 'Selecione um setor',
                    type: 'Selecione um tipo',
                    title: '',
                });
                toast.dismiss();
                toast.success('Solicitação enviada com sucesso', {
                    autoClose: 10,
                });
            } else {
                setError('Ocorreu um erro durante o envio.');
                toast.dismiss();
                // toast.error('Erro durante o envio. Verifique os campos');
                setAnimationShown(true);
                setTimeout(() => {
                    setAnimationShown(false);
                }, 1500);
            }
        } catch (error) {
            console.error('Erro ao enviar a solicitação:', error);
            setError('Ocorreu um erro no servidor.');
            toast.dismiss();
            // toast.error('Erro no servidor. Verifique os campos');
            setAnimationShown(true);
            setTimeout(() => {
                setAnimationShown(false);
            }, 1500);
        }
    };
    const isWideScreen = windowWidth > 2000;

    return (
        <div>
            <header className="bg-blue-500 h-6rem min-h-[48px] w-full top-0 fixed z-10">
                <h1 className="text-white text-2xl pt-2 font-extrabold ml-2" style={{ textShadow: '1px 1px 1px rgba(0,0,0,1)' }}>
                    Ticket para Projetos e Desenvolvimento
                </h1>
                <div className="relative w-full h-2">
                    <div className="absolute w-full h-full animate-gradient"></div>
                </div>
            </header>
            <main>
                <form
                    onSubmit={handleSubmit}
                    className={`max-w-[900px] max-h-[100vh] mx-auto mt-4 p-4 flex flex-col ${isWideScreen ? 'max-w-[1300px]' : ''
                        }`}
                    autoComplete="off"
                >
                    <div className="flex justify-center items-center " style={{ marginBottom: '-1rem' }}>
                        <Image src='/DevTask.svg' alt="Logo" width={280} height={280} priority={true} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-3">
                        <div className="mb-0.5 relative">
                            <FloatingLabelInput
                                label="Nome do solicitante:"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                type="text"
                                error={!!errors.name}
                            />
                        </div>
                        <div className="0.5 relative">
                            <FloatingLabelInput
                                label="Email do solicitante:"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                error={!!errors.email}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-3">
                        <div className="mb-0.5 relative">
                            <FloatingLabelInput
                                label="Telefone do solicitante:"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                type="tel"
                                error={!!errors.phone}
                            />
                        </div>
                        <div className="mb-0.5 relative">
                            <label
                                htmlFor="sector"
                                className={`block font-bold text-gray-100 transition-transform ${selectedSector ? '-translate-y-5 text-xs  text-gray-400' : ''
                                    } absolute left-4 top-1/3 mt-2 transform -translate-y-2/4 ${selectedSector ? 'active' : ''
                                    }`}
                            >
                                Setor
                            </label>
                            <CustomSelect
                                id="sector"
                                options={sectorOptions}
                                value={selectedSector}
                                onChange={handleSelectChangeSector}
                                isSearchable={false}
                                styles={customStyles}
                                placeholder='Setor:'
                            />
                        </div>
                        <div className="mb-0.5 relative">
                            <label
                                htmlFor="type"
                                className={`block font-bold text-white-900 transition-transform z-10 ${selectedOption ? '-translate-y-2 text-xs text-gray-400' : ''
                                    } absolute left-4 top-${selectedOption ? '-2' : '1/2'
                                    } transform -translate-y-2/4 ${selectedOption ? 'active' : ''}`}
                            ></label>
                            <CustomSelect
                                id="type"
                                options={typeOptions}
                                value={typeOptions.find(option => option.value === formData.type) || null}
                                onChange={handleSelectChange}
                                isSearchable={false}
                                styles={customStyles}
                                placeholder='Tipo Ticket:'
                            />
                        </div>
                    </div>
                    <div className="mb-3 relative">
                        <FloatingLabelInput
                            label="Título da solicatação:"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            type="text"
                            error={!!errors.title}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="relative">
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Descreva detalhadamente a sua solicitação"
                                required
                                className={`bg-[#2f2e2e] border px-[0.4rem]  py-5 rounded-md w-full h-32 focus:outline-none focus:ring focus:border-blue-300 ${errors.description ? 'border-red-500' : 'border-white-900'
                                    } text-white`}
                            />
                            <label
                                htmlFor="description"
                                className={`block font-bold text-white-900 absolute top-1 left-3 transition-all text-xs ${(formData.description || errors.description) ? 'text-gray-400' : 'text-white'
                                    }`}
                                style={{ fontSize: '1rem' }}
                            >
                                Descrição da Solicitação:
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center h-full">
                        <label
                            htmlFor="file"
                            className={`flex flex-col items-center justify-center cursor-pointer border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-center ${isDragging ? 'border-blue-500' : ''
                                }`}
                            onDragOver={(e) => handleDragOver(e)}
                            onDragLeave={() => handleDragLeave()}
                            onDrop={(e) => handleDrop(e)}
                        >
                            <span className={`mb-2 `}>
                                <BsFolder size={42} color="#6881ba" />
                            </span>
                            <strong className={`text-gray-100 font-bold`}>
                                Arrastar e Soltar
                            </strong>
                            <div className={`text-gray-400 mt-2 mb-1 font-serif ${fileSelected ? 'hidden' : ''}`}>
                                É permitido enviar apenas um arquivo. Caso precise enviar mais de um arquivo, por favor, comprima-os em um único arquivo antes de enviar.
                            </div>
                            {selectedFileName && fileUrl && (
                                <div className={`mt-2 mb-1 font-serif text-gray-400 ${fileSelected ? '' : 'hidden'}`}>
                                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                                        {selectedFileName}
                                    </a>
                                </div>
                            )}
                            {/* {selectedFileName && fileUrl && (
                                <div className={`mt-2 mb-1 font-serif text-gray-400 ${fileSelected ? '' : 'hidden'}`}>
                                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                                        {selectedFileName}
                                    </a>
                                </div>
                            )} */}

                            <input
                                type="file"
                                id="file"
                                name="file"
                                accept=".jpg, .jpeg, .png, .pdf"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <div className="flex items-center">
                                <button
                                    className={`mt-2 border border-gray-300 text-white px-2 py-1.0 rounded-md hover:bg-gray-200 focus:outline-none focus:ring focus:border-blue-300`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const fileInput = document.getElementById('file');
                                        if (fileInput) {
                                            fileInput.click();
                                        }
                                    }}
                                    style={{
                                        backgroundColor: 'transparent',
                                        borderColor: 'gray',
                                        fontSize: '0.9rem',
                                        textShadow: '1px 1px 1px #000000',
                                    }}
                                >
                                    Anexar Arquivo
                                </button>
                                <span style={{ fontSize: '0.79rem', marginLeft: '8px', marginTop: '0.49rem' }}>
                                    Tamanho Máximo 25MB
                                </span>
                            </div>
                        </label>
                    </div>
                    <div className="flex flex-row justify-between sm:flex-row sm:self-end gap-1 mb-3">
                        <button
                            type="button"
                            className="bg-white text-black font-bold px-4 py-2 rounded-md hover:bg-gray-400 mt-2"
                            style={{ fontSize: '0.9rem', textShadow: '1px 1px 1px #00185a92' }}
                        // onClick={clearFormFields} 
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-500 mt-2"
                            style={{ textShadow: '1px 1px 1px rgba(0,0,0,1.3)' }}
                        >
                            Enviar Solicitação
                        </button>
                    </div>
                </form>
                <ToastContainer></ToastContainer>
                <footer className="h-6rem w-full fixed bottom-0 mt-10" style={{ backgroundColor: "#000000" }}>

                <footer className="h-6rem w-full fixed bottom-0 mt-10" style={{ backgroundColor: "#000000" }}>

{animationShown && (
    <div className="flex flex-col fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 items-center justify-center">
        <LottieAnimation animationData={animationData} width="300px" height="300px" />
        <span className='font-extrabold'></span>
        {errorMessages.map((errorMsg, index) => (
            <span key={index} className='text-white font-extrabold' style={{ textShadow: '1px 1px 1px  #ff0000c5', fontSize:'1.3rem' }}>{errorMsg}</span>
        ))}
    </div>
)}
</footer>
</footer>
            </main>
        </div>
    );
};
export default RequestForm;







