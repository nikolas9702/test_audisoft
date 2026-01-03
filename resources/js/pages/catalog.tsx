import React, { useState, ChangeEvent, } from 'react';
import { Trash2, Edit2, Plus, ExternalLink, Check, X, AlertCircle } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import fetchActionWeb from '@/lib/fetch/fetchWeb';

const routeCategory = 'category';
const routeSite = 'site';

// ============= INTERFACES =============

interface Category {
    id: number;
    name: string;
}

interface Site {
    id: number;
    name: string;
    url: string;
    category_id: number;
}

interface SiteFormState {
    id: number | null;
    name: string;
    url: string;
    category_id: string | number;
}

interface CategoryFormState {
    id: number | null;
    name: string;
}

interface AlertState {
    show: boolean;
    type: 'success' | 'error' | '';
    message: string;
}

interface PageProps {
    categories: Category[]
    sites: Site[]
}

// ============= COMPONENTS =============

// Alert Component
const Alert = ({ show, type, message }: { show: boolean, type: string, message: string }) => {
    if (!show) return null;

    return (
        <div className={`rounded-xl p-4 mb-6 flex items-center gap-3 ${
            type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
            {type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-medium">{message}</span>
        </div>
    );
};

// Navigation Tabs Component
const NavigationTabs = ({ activeView, onViewChange }: { activeView: string, onViewChange: (view: 'sites' | 'categories') => void }) => {
    return (
        <div className="flex gap-4 mb-6">
            <button
                onClick={() => onViewChange('sites')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeView === 'sites'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
            >
                Sitios Web
            </button>
            <button
                onClick={() => onViewChange('categories')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeView === 'categories'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
            >
                Categorías
            </button>
        </div>
    );
};

// Site Form Component
const SiteForm = ({
                      formData,
                      categories,
                      isEditing,
                      onFormChange,
                      onSubmit,
                      onCancel
                  }: {
    formData: SiteFormState,
    categories: Category[],
    isEditing: boolean,
    onFormChange: (data: SiteFormState) => void,
    onSubmit: () => void,
    onCancel: () => void
}) => {
    const handleInputChange = (field: string, value: string) => {
        if (typeof field !== 'string') return;
        onFormChange({ ...formData, [field]: value });
    };

    const handleSubmitClick = () => {
        if (!formData.name || typeof formData.name !== 'string') return;
        if (!formData.url || typeof formData.url !== 'string') return;
        if (!formData.category_id) return;
        onSubmit();
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Plus className="w-6 h-6 text-indigo-600" />
                {isEditing ? 'Editar Sitio' : 'Agregar Nuevo Sitio'}
            </h2>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Nombre del sitio"
                        value={formData.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                        className="px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="url"
                        placeholder="https://ejemplo.com"
                        value={formData.url}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('url', e.target.value)}
                        className="px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <select
                        value={formData.category_id}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange('category_id', e.target.value)}
                        className="px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Selecciona categoría</option>
                        {Array.isArray(categories) && categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleSubmitClick}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                        {isEditing ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        {isEditing ? 'Actualizar' : 'Agregar'}
                    </button>
                    {isEditing && (
                        <button
                            onClick={onCancel}
                            className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-colors flex items-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Cancelar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// Site Table Row Component
const SiteTableRow = ({ site, categoryName, onEdit, onDelete }: {
    site: Site,
    categoryName: string,
    onEdit: (site: Site) => void,
    onDelete: (id: number) => void
}) => {
    if (!site || typeof site.id !== 'number') return null;

    return (
        <tr className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 font-medium text-slate-800">{site.name}</td>
            <td className="px-6 py-4">
                <a
                    href={'https://'+site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2 hover:underline"
                >
                    {site.url}
                    <ExternalLink className="w-4 h-4" />
                </a>
            </td>
            <td className="px-6 py-4">
        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
          {categoryName}
        </span>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => onEdit(site)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(site.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

// Sites Table Component
const SitesTable = ({ sites, categories, onEdit, onDelete }: {
    sites: Site[],
    categories: Category[],
    onEdit: (site: Site) => void,
    onDelete: (id: number) => void
}) => {
    const getCategoryName = (category_id: number) => {
        if (typeof category_id !== 'number') return 'Sin categoría';
        const category = categories.find(c => c.id === category_id);
        return category ? category.name : 'Sin categoría';
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Nombre</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">URL</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Categoría</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {!Array.isArray(sites) || sites.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                No hay sitios registrados. ¡Agrega tu primer sitio!
                            </td>
                        </tr>
                    ) : (
                        sites.map(site => (
                            <SiteTableRow
                                key={site.id}
                                site={site}
                                categoryName={getCategoryName(site.category_id)}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Category Form Component
const CategoryForm = ({
                          formData,
                          isEditing,
                          onFormChange,
                          onSubmit,
                          onCancel
                      }: {
    formData: CategoryFormState,
    isEditing: boolean,
    onFormChange: (data: CategoryFormState) => void,
    onSubmit: () => void,
    onCancel: () => void
}) => {
    const handleInputChange = (value: string) => {
        if (typeof value !== 'string') return;
        onFormChange({ ...formData, name: value });
    };

    const handleSubmitClick = () => {
        if (!formData.name || typeof formData.name !== 'string' || !formData.name.trim()) return;
        onSubmit();
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Plus className="w-6 h-6 text-indigo-600" />
                {isEditing ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
            </h2>
            <div className="space-y-4">
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Nombre de la categoría"
                        value={formData.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        onClick={handleSubmitClick}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                        {isEditing ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        {isEditing ? 'Actualizar' : 'Agregar'}
                    </button>
                    {isEditing && (
                        <button
                            onClick={onCancel}
                            className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-colors flex items-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Cancelar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// Category Table Row Component
const CategoryTableRow = ({ category, sitesCount, isInUse, onEdit, onDelete }: {
    category: Category,
    sitesCount: number,
    isInUse: boolean,
    onEdit: (cat: Category) => void,
    onDelete: (id: number) => void
}) => {
    if (!category || typeof category.id !== 'number') return null;

    return (
        <tr className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 font-medium text-slate-800">{category.name}</td>
            <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            sitesCount > 0
                ? 'bg-green-100 text-green-700'
                : 'bg-slate-100 text-slate-600'
        }`}>
          {sitesCount} {sitesCount === 1 ? 'sitio' : 'sitios'}
        </span>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => onEdit(category)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(category.id)}
                        disabled={isInUse}
                        className={`p-2 rounded-lg transition-colors ${
                            isInUse
                                ? 'text-slate-400 cursor-not-allowed'
                                : 'text-red-600 hover:bg-red-50'
                        }`}
                        title={isInUse ? 'No se puede eliminar (en uso)' : 'Eliminar'}
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

// Categories Table Component
const CategoriesTable = ({ categories, sites, onEdit, onDelete }: {
    categories: Category[],
    sites: Site[],
    onEdit: (cat: Category) => void,
    onDelete: (id: number) => void
}) => {
    const isCategoryInUse = (category_id: number) => {
        if (typeof category_id !== 'number') return false;
        return Array.isArray(sites) && sites.some(site => site.category_id === category_id);
    };

    const getSitesCount = (category_id: number) => {
        if (typeof category_id !== 'number') return 0;
        return Array.isArray(sites) ? sites.filter(s => s.category_id === category_id).length : 0;
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Nombre</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Sitios</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {!Array.isArray(categories) || categories.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                                No hay categorías registradas. ¡Agrega tu primera categoría!
                            </td>
                        </tr>
                    ) : (
                        categories.map(category => (
                            <CategoryTableRow
                                key={category.id}
                                category={category}
                                sitesCount={getSitesCount(category.id)}
                                isInUse={isCategoryInUse(category.id)}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// ============= MAIN APP =============
function SitesManager() {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { categories, sites } = usePage<PageProps>().props
    const token = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute('content') ?? ''

    // State
    const [sitesState, setSites] = useState<Site[]>(sites);
    const [categoriesState, setCategories] = useState<Category[]>(categories);
    const [view, setView] = useState<'sites' | 'categories'>('sites');

    const [siteForm, setSiteForm] = useState<SiteFormState>({ id: null, name: '', url: '', category_id: '' });
    const [categoryForm, setCategoryForm] = useState<CategoryFormState>({ id: null, name: '' });
    const [isEditingSite, setIsEditingSite] = useState(false);
    const [isEditingCategory, setIsEditingCategory] = useState(false);

    const [alert, setAlert] = useState<AlertState>({ show: false, type: '', message: '' });

    const { fetchPost , fetchPut , fetchDelete } = fetchActionWeb({token})

    // Alert handler
    const showAlert = (type: 'success' | 'error', message: string) => {
        if (typeof type !== 'string' || typeof message !== 'string') return;
        setAlert({ show: true, type, message });
        setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
    };

    // Site handlers
    const handleCreateSite = () => {
        if (!siteForm.name || !siteForm.url || !siteForm.category_id) {
            showAlert('error', 'Por favor completa todos los campos');
            return;
        }


        fetchPost(siteForm, routeSite).then( (response : {id:number}) => {

            const newSite: Site = {
                id: response?.id ?? Date.now(),
                name: String(siteForm.name),
                url: String(siteForm.url),
                category_id: parseInt(siteForm.category_id as string, 10)
            };

            setSites([...sitesState, newSite]);
            setSiteForm({ id: null, name: '', url: '', category_id: '' });
            showAlert('success', 'Sitio creado exitosamente');

        }).catch( () => {

            showAlert('error', 'El nombre esta repetido');
        })



    };

    const handleUpdateSite = () => {
        if (!siteForm.name || !siteForm.url || !siteForm.category_id) {
            showAlert('error', 'Por favor completa todos los campos');
            return;
        }

        fetchPut(siteForm, `${routeSite}/${siteForm.id}`).then( () => {

            setSites(sitesState.map(site =>
                site.id === siteForm.id
                    ? {
                        ...site,
                        name: String(siteForm.name),
                        url: String(siteForm.url),
                        category_id: parseInt(siteForm.category_id as string, 10)
                    }
                    : site
            ));

            setSiteForm({ id: null, name: '', url: '', category_id: '' });
            setIsEditingSite(false);
            showAlert('success', 'Sitio actualizado exitosamente');

        }).catch( () => {

            showAlert('error', 'Error al actualizar el sitio');
        })


    };

    const handleEditSite = (site: Site) => {
        if (!site || typeof site.id !== 'number') return;
        setSiteForm({
            id: site.id,
            name: String(site.name),
            url: String(site.url),
            category_id: site.category_id
        });
        setIsEditingSite(true);
    };

    const handleDeleteSite = (id: number) => {
        if (typeof id !== 'number') return;
        if (window.confirm('¿Estás seguro de eliminar este sitio?')) {
            fetchDelete({}, `${routeSite}/${id}`).then( () => {

                setSites(sitesState.filter(site => site.id !== id));
                showAlert('success', 'Sitio eliminado exitosamente');

            }).catch( () => {

                showAlert('error', 'Error al eliminar el sitio');
            })

        }
    };

    const handleCancelSiteEdit = () => {
        setSiteForm({ id: null, name: '', url: '', category_id: '' });
        setIsEditingSite(false);
    };


    // Category handlers
    const isCategoryInUse = (category_id: number) => {
        if (typeof category_id !== 'number') return false;
        return sitesState.some(site => site.category_id === category_id);
    };

    const handleCreateCategory = () => {
        if (!categoryForm.name || !categoryForm.name.trim()) {
            showAlert('error', 'El nombre de la categoría es requerido');
            return;
        }
        fetchPost(categoryForm, routeCategory).then( (response : {id:number}) => {

            const newCategory: Category = {
                id:  response?.id ?? Date.now(),
                name: String(categoryForm.name)
            };

            setCategories([...categoriesState, newCategory]);
            setCategoryForm({ id: null, name: '' });
            showAlert('success', 'Categoría creada exitosamente');

        }).catch( () => {

            showAlert('error', 'El nombre esta repetido');
        })

    };

    const handleUpdateCategory = () => {
        if (!categoryForm.name || !categoryForm.name.trim()) {
            showAlert('error', 'El nombre de la categoría es requerido');
            return;
        }
        fetchPut(categoryForm, `${routeCategory}/${categoryForm.id}`).then( () => {

            setCategories(categoriesState.map(cat =>
                cat.id === categoryForm.id
                    ? { ...cat, name: String(categoryForm.name) }
                    : cat
            ));

            setCategoryForm({ id: null, name: '' });
            setIsEditingCategory(false);
            showAlert('success', 'Categoría actualizada exitosamente');

        }).catch( () => {

            showAlert('error', 'Error al actualizar el nombre');
        })


    };

    const handleEditCategory = (category: Category) => {
        if (!category || typeof category.id !== 'number') return;
        setCategoryForm({ id: category.id, name: String(category.name) });
        setIsEditingCategory(true);
    };

    const handleDeleteCategory = (id: number) => {
        if (typeof id !== 'number') return;

        if (isCategoryInUse(id)) {
            showAlert('error', 'No se puede eliminar una categoría en uso');
            return;
        }
        fetchDelete(categoryForm, `${routeCategory}/${id}`).then( () => {

            setCategories(categoriesState.filter(cat => cat.id !== id));
            showAlert('success', 'Categoría eliminada exitosamente');

        }).catch( () => {

            showAlert('error', 'Error al eliminar la categoria');
        })


    };

    const handleCancelCategoryEdit = () => {
        setCategoryForm({ id: null, name: '' });
        setIsEditingCategory(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">
                        Gestor de Sitios Web
                    </h1>
                    <p className="text-slate-600">Organiza tus sitios favoritos por categorías</p>
                </div>

                <Alert show={alert.show} type={alert.type} message={alert.message} />

                <NavigationTabs activeView={view} onViewChange={setView} />

                {view === 'sites' && (
                    <div className="space-y-6">
                        <SiteForm
                            formData={siteForm}
                            categories={categoriesState}
                            isEditing={isEditingSite}
                            onFormChange={setSiteForm}
                            onSubmit={isEditingSite ? handleUpdateSite : handleCreateSite}
                            onCancel={handleCancelSiteEdit}
                        />
                        <SitesTable
                            sites={sitesState}
                            categories={categoriesState}
                            onEdit={handleEditSite}
                            onDelete={handleDeleteSite}
                        />
                    </div>
                )}

                {view === 'categories' && (
                    <div className="space-y-6">
                        <CategoryForm
                            formData={categoryForm}
                            isEditing={isEditingCategory}
                            onFormChange={setCategoryForm}
                            onSubmit={isEditingCategory ? handleUpdateCategory : handleCreateCategory}
                            onCancel={handleCancelCategoryEdit}
                        />
                        <CategoriesTable
                            categories={categoriesState}
                            sites={sitesState}
                            onEdit={handleEditCategory}
                            onDelete={handleDeleteCategory}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default SitesManager;
