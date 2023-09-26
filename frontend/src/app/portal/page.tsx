'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsFolder } from 'react-icons/bs';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RequestForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        description: '',
        file: null as File | null,
        unit: '',
        sector: '',
        type: '',
        title: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [fileSelected, setFileSelected] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [options, setOptions] = useState([]);
    const [labelActive, setLabelActive] = useState(false);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const [windowWidth, setWindowWidth] = useState<number>(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file && file.size > 25 * 1024 * 1024) {
            setError('O arquivo selecionado é muito grande. O tamanho máximo permitido é de 25MB.');
        } else {
            setFormData((prevData) => ({
                ...prevData,
                file,
            }));
            setFileSelected(!!file);
            setSelectedFileName(file ? file.name : null);
            if (file) {
                const fileUrl = URL.createObjectURL(file);
                setFileUrl(fileUrl);
            } else {
                setFileUrl(null);
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
        axios.get('/api/options')
            .then(response => {
                setOptions(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar opções:', error);
            });
    }, []);

    const handleChangeSelect = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSelectFocus = () => {
        setLabelActive(true);
    };

    const handleSelectBlur = () => {
        if (!formData.sector) {
            setLabelActive(false);
        }
    };

    const handleInputChange = (fieldName: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(formData)

        const { name, email, phone, description, file, unit, sector, type, title } = formData;
        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('email', email);
        formDataToSend.append('phone', phone);
        formDataToSend.append('description', description);
        if (file) {
            formDataToSend.append('file', file);
        }
        formDataToSend.append('unit', unit);
        formDataToSend.append('sector', sector);
        formDataToSend.append('type', type);
        formDataToSend.append('title', title);

        try {
            const response = await axios.post('/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    description: '',
                    file: null,
                    unit: 'Selecione uma unidade',
                    sector: 'Selecione um setor',
                    type: 'Selecione um tipo',
                    title: ''
                });
                setError(null);
                toast.dismiss();
                toast.success('Solicitação enviada com sucesso', {
                    autoClose: 5000,
                });
            } else {
                setError('Ocorreu um erro durante o envio.');
                toast.dismiss();
                toast.error('Erro durante o envio. Verifique os campos');
            }
        } catch (error) {
            setError('Ocorreu um erro no servidor.');
            toast.dismiss();
            toast.error('Erro no servidor. Verifique os campos');
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
                    className={`max-w-[900px]   mx-auto mt-4 p-4 flex flex-col ${isWideScreen ? 'max-w-[1300px]' : ''
                        }`}
                    autoComplete="off"
                >
                    <div className="flex justify-center items-center " style={{ marginBottom: '-1rem' }}>
                        <Image src='/DevTask.svg' alt="Logo" width={280} height={280} />

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-3">
                        <div className="mb-0.5 relative">
                            <label
                                htmlFor="name"
                                className={`block font-bold text-white-900 transition-transform ${formData.name || formData.name.length > 0 ? '-translate-y-5 text-xs text-gray-400' : ''
                                    } absolute left-4 top-2/4 transform -translate-y-2/4 ${formData.name || formData.name.length > 0 ? 'active' : ''
                                    }`}
                            >
                                Nome do Solicitante:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                onFocus={() => {
                                    handleInputChange('name', '');

                                }}
                                onBlur={() => {
                                    if (!formData.name || formData.name.length === 0) {
                                        handleInputChange('name', '');
                                    }
                                }}
                                required
                                className={`bg-[#2f2e2e] border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-350`}
                                style={{ padding: '1rem 0.4rem 0.2rem 0.4rem ' }}
                            />
                        </div>

                        <div className="0.5 relative">
                            <label
                                htmlFor="email"
                                className={`block font-bold text-white-900 transition-transform ${formData.email || formData.email.length > 0 ? '-translate-y-5 text-xs text-gray-400' : ''
                                    } absolute left-4 top-2/4 transform -translate-y-2/4 ${formData.email || formData.email.length > 0 ? 'active' : ''
                                    }`}
                            >
                                E-mail do Solicitante:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                onFocus={() => {
                                    handleInputChange('email', '');

                                }}
                                onBlur={() => {
                                    if (!formData.email || formData.email.length === 0) {
                                        handleInputChange('email', '');
                                    }
                                }}
                                required
                                className={`bg-[#2f2e2e] border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-350`}
                                style={{ padding: '1rem 0.4rem 0.2rem 0.4rem ' }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-3">
                        <div className="mb-0.5 relative">
                            <label
                                htmlFor="phone"
                                className={`block font-bold text-white-900 transition-transform ${formData.phone || formData.phone.length > 0 ? '-translate-y-5 text-xs text-gray-400' : ''
                                    } absolute left-4 top-2/4 transform -translate-y-2/4 ${formData.phone || formData.phone.length > 0 ? 'active' : ''
                                    }`}
                            >
                                Telefone do Solicitante:
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                onFocus={() => handleInputChange('phone', '')}
                                onBlur={() => {
                                    if (!formData.phone || formData.phone.length === 0) {
                                        handleInputChange('phone', '');
                                    }
                                }}
                                required
                                className={`bg-[#2f2e2e] border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-350`}
                                style={{ padding: '1rem 0.4rem 0.2rem 0.4rem ' }}
                            />
                        </div>

                        <div className="mb-0.5 relative">
                            <label
                                htmlFor="sector"
                                className={`block font-bold text-gray-100 transition-transform ${labelActive ? '-translate-y-5 text-xs  text-gray-400' : ''
                                    } absolute left-4 top-2/4 transform -translate-y-2/4 ${labelActive ? 'active' : ''
                                    }`}
                            >
                                Setor
                            </label>
                            <select
                                id="sector"
                                name="sector"
                                value={formData.sector}
                                onChange={(e) => handleChangeSelect(e)}
                                onFocus={handleSelectFocus}
                                onBlur={handleSelectBlur}
                                className={`bg-[#2f2e2e] border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-350`}
                                style={{ padding: '1.2rem 0.4rem 0.2rem 0.4rem ' }}
                            >
                                <option value=""></option>
                                <option value="teste">teste</option>
                                {options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className="mb-3 relative">
                        <label
                            htmlFor="type"
                            className={`block font-bold text-gray-100 transition-transform ${formData.unit || formData.unit.length > 0 ? '-translate-y-5 text-xs text-gray-400' : ''
                                } absolute left-4 top-2/4 transform -translate-y-2/4 ${formData.unit || formData.unit.length > 0 ? 'active' : ''
                                }`}
                        >
                            Tipo Ticket:
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={(e) => handleChangeSelect(e)}
                            onFocus={() => handleInputChange('type', '')}
                            onBlur={() => {
                                if (!formData.unit || formData.unit.length === 0) {
                                    handleInputChange('type', '');
                                }
                            }}
                            className={`bg-[#2f2e2e] border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-350`}
                            style={{ padding: '1.2rem 0.4rem 0.2rem 0.4rem ' }}
                        >
                            <option value=""></option>

                        </select>
                    </div>
                    <div className="mb-4 relative">
                        <label
                            htmlFor="title"
                            className={`block font-bold text-white-900 transition-transform ${formData.title || formData.title.length > 0 ? '-translate-y-5 text-xs text-gray-400' : ''
                                } absolute left-4 top-2/4 transform -translate-y-2/4 ${formData.title || formData.title.length > 0 ? 'active' : ''
                                }`}
                        >
                            Título da Solicitação:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            onFocus={() => {
                                handleInputChange('title', '');

                            }}
                            onBlur={() => {
                                if (!formData.name || formData.name.length === 0) {
                                    handleInputChange('title', '');
                                }

                            }}
                            required
                            className={`bg-[#2f2e2e] border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-350`}
                            style={{ padding: '1rem 0.4rem 0.2rem 0.4rem ' }}
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
                                className="bg-[#2f2e2e] border border-white-900 px-3 py-2 rounded-md w-full h-32 focus:outline-none focus:ring focus:border-blue-300"
                                style={{
                                    paddingTop: '1.8rem',
                                    fontSize: '0.7rem',
                                }}
                            />
                            <label
                                htmlFor="description"
                                className="block text-white-900 font-bold absolute top-2 left-3"
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
                            {selectedFileName && (
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
                    <div className="flex gap-2 self-end">
                        <button type="submit" className="bg-white text-black font-bold px-4 py-2 rounded-md hover:bg-gray-400 mt-2"
                            style={{ fontSize: '0.9rem', textShadow: '1px 1px 1px #00185a92' }}>
                            Cancelar
                        </button>
                        <button type="submit" className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-500 mt-2"
                            style={{ textShadow: '1px 1px 1px rgba(0,0,0,1.3)' }}>
                            Enviar Solicitação
                        </button>
                    </div>
                </form>
                <ToastContainer />
                <footer className=" h-6rem min-h-[48px] w-full  botton-0 relative mt-10" style={{ backgroundColor: "#000000" }}>
                </footer>
            </main>
        </div>
    );
};

export default RequestForm;