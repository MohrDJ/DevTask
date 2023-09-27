'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsFolder } from 'react-icons/bs';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ActionMeta} from 'react-select';
import LottieAnimation from '@/components/animation/configAnimation';
import animationData from '../../assets/animations/animation_ln1zz6z5.json';
import { Option, customStyles, ClearIndicator, CustomSelect, CustomOption } from '../../components/selectReact/constructor';
import FloatingLabelInput from '@/components/LabelFloat/float';


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
    const [selectedSector, setSelectedSector] = useState<CustomOption | null>(null);
    const [sectorOptions, setSectorOptions] = useState<CustomOption[]>([]);
    const [selectedOption, setSelectedOption] = useState<CustomOption | null>(null);
    const [animationShown, setAnimationShown] = useState(false);



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

        if (file) {
            if (file.size > 25 * 1024 * 1024) {
                toast.error('O arquivo selecionado é muito grande. O tamanho máximo permitido é de 25MB.');
            } else if (!/^image\/(jpeg|png)$|^application\/pdf$/.test(file.type)) {
                toast.dismiss();
                toast.error('O formato do arquivo não é suportado. Apenas arquivos JPG, PNG e PDF são permitidos.');
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
        } else {
            setFormData((prevData) => ({
                ...prevData,
                file: null,
            }));
            setFileSelected(false);
            setSelectedFileName(null);
            setFileUrl(null);
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
        axios.get('/api/')
            .then(response => {
                setSectorOptions(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar opções de setor:', error);
            });
    }, []);


    const handleSelectChangeSector = (selectedOption: CustomOption | null, actionMeta: ActionMeta<any>) => {
        if (actionMeta.action === 'select-option') {
            setSelectedSector(selectedOption);
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

    const customOptions: CustomOption[] = [
      
        {
            value: 'Projetos',
            label: 'Projetos',
            description: 'Utilize esta fila para solicitar o desenvolvimento de um novo sistema dentro do ecossistema da Pormade Portas.',
        },
        {
            value: 'Implementações',
            label: 'Implementações',
            description: 'Utilize esta fila para solicitar a adição de novos recursos em um sistema já existente no ecossistema da Pormade Portas.',
        }, {
            value: 'Incidentes',
            label: 'Incidentes',
            description: 'Utilize esta fila exclusivamente para relatar eventos inesperados. Um incidente abrange situações em que algo que estava em funcionamento deixou de operar corretamente. Observe que configurações e solicitações de novos serviços não devem ser tratados como incidentes.',
        },
    ];

    const handleSelectChange = (selectedOption: CustomOption | null, actionMeta: ActionMeta<any>) => {
        if (actionMeta.action === 'select-option') {
            setFormData((prevData) => ({
                ...prevData,
                type: selectedOption?.value || '',
            }));
        }
    };

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
                setError('Ocorreu um erro');
                toast.dismiss();
                toast.success('Solicitação enviada com sucesso', {
                    autoClose: 10,
                });
            } else {
                setError('Ocorreu um erro durante o envio.');
                toast.dismiss();
                toast.error('Erro durante o envio. Verifique os campos');
                setAnimationShown(true);
                setTimeout(() => {
                    setAnimationShown(false);
                }, 1500);

            }
        } catch (error) {
            setError('Ocorreu um erro no servidor.');
            toast.dismiss();
            toast.error('Erro no servidor. Verifique os campos');
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
                    className={`max-w-[900px]   mx-auto mt-4 p-4 flex flex-col ${isWideScreen ? 'max-w-[1300px]' : ''
                        }`}
                    autoComplete="off"
                >
                    <div className="flex justify-center items-center " style={{ marginBottom: '-1rem' }}>
                        <Image src='/DevTask.svg' alt="Logo" width={280} height={280} />

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-3">
                        <div className="mb-0.5 relative">
                            <FloatingLabelInput
                                label="Nome do solicitante:"
                                name="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className="0.5 relative">
                            <FloatingLabelInput
                                label="E-mail do Solicitante:"
                                name="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                type="email" 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-3">
                        <div className="mb-0.5 relative">
                            <FloatingLabelInput
                                label="Telefone do Solicitante:"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                type="tel" 
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
                                options={customOptions}
                                value={customOptions.find(option => option.value === formData.type) || null}
                                onChange={handleSelectChange}
                                isSearchable={false}
                                styles={customStyles}
                                placeholder='Tipo Ticket:'
                            />
                        </div>
                    </div>
                    <div className="mb-4 relative">
                    <FloatingLabelInput
                                label="Título da Solicitação:"
                                name="title"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                type="text" 
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
                <footer className=" h-6rem min-h-[48px] w-full  botton-0 relative mt-10" style={{ backgroundColor: "#000000" }}>
                    {error && animationShown && (
                        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 flex items-center justify-center">
                            <LottieAnimation animationData={animationData} />
                        </div>
                    )}
                </footer>
            </main>
        </div>
    );
};

export default RequestForm;





