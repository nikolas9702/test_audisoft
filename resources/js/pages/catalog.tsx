import React, { useState } from 'react';
import { Trash2, Edit2, Plus, ExternalLink, Check, X, AlertCircle } from 'lucide-react';

// Datos iniciales de ejemplo
const initialCategories = [
    { id: 1, name: 'Libros' },
    { id: 2, name: 'Ropa' },
    { id: 3, name: 'Zapatos' },
    { id: 4, name: 'Electrónicos' }
];

const initialSites = [
    { id: 1, name: 'Librería Nacional', url: 'https://librerianacional.com/', categoryId: 1 },
    { id: 2, name: 'Zara', url: 'https://www.zara.com/co/', categoryId: 2 },
    { id: 3, name: 'Bosi', url: 'https://www.bosi.com.co/', categoryId: 3 }
];

function Catalog() {
    const [sites, setSites] = useState(initialSites);
    const [categories, setCategories] = useState(initialCategories);
    const [view, setView] = useState('sites');

    const [siteForm, setSiteForm] = useState({ id: null, name: '', url: '', categoryId: '' });
    const [categoryForm, setCategoryForm] = useState({ id: null, name: '' });
    const [isEditingSite, setIsEditingSite] = useState(false);
    const [isEditingCategory, setIsEditingCategory] = useState(false);

    const [alert, setAlert] = useState({ show: false, type: '', message: '' });

    const showAlert = (type , message) => {
        setAlert({ show: true, type, message });
        setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.name : 'Sin categoría';
    };

    const isCategoryInUse = (categoryId) => {
        return sites.some(site => site.categoryId === categoryId);
    };

    const handleCreateSite = () => {
        if (!siteForm.name || !siteForm.url || !siteForm.categoryId) {
            showAlert('error', 'Por favor completa todos los campos');
            return;
        }

        const newSite = {
            id: Date.now(),
            name: siteForm.name,
            url: siteForm.url,
            categoryId: parseInt(siteForm.categoryId)
        };

        setSites([...sites, newSite]);
        setSiteForm({ id: null, name: '', url: '', categoryId: '' });
        showAlert('success', 'Sitio creado exitosamente');
    };

    const handleUpdateSite = () => {
        if (!siteForm.name || !siteForm.url || !siteForm.categoryId) {
            showAlert('error', 'Por favor completa todos los campos');
            return;
        }

        setSites(sites.map(site =>
            site.id === siteForm.id
                ? { ...site, name: siteForm.name, url: siteForm.url, categoryId: parseInt(siteForm.categoryId) }
                : site
        ));

        setSiteForm({ id: null, name: '', url: '', categoryId: '' });
        setIsEditingSite(false);
        showAlert('success', 'Sitio actualizado exitosamente');
    };

    const handleEditSite = (site) => {
        setSiteForm({ id: site.id, name: site.name, url: site.url, categoryId: site.categoryId });
        setIsEditingSite(true);
    };

    const handleDeleteSite = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este sitio?')) {
            setSites(sites.filter(site => site.id !== id));
            showAlert('success', 'Sitio eliminado exitosamente');
        }
    };

    const handleCancelSiteEdit = () => {
        setSiteForm({ id: null, name: '', url: '', categoryId: '' });
        setIsEditingSite(false);
    };

    const handleCreateCategory = () => {
        if (!categoryForm.name.trim()) {
            showAlert('error', 'El nombre de la categoría es requerido');
            return;
        }

        const newCategory = {
            id: Date.now(),
            name: categoryForm.name
        };

        setCategories([...categories, newCategory]);
        setCategoryForm({ id: null, name: '' });
        showAlert('success', 'Categoría creada exitosamente');
    };

    const handleUpdateCategory = () => {
        if (!categoryForm.name.trim()) {
            showAlert('error', 'El nombre de la categoría es requerido');
            return;
        }

        setCategories(categories.map(cat =>
            cat.id === categoryForm.id
                ? { ...cat, name: categoryForm.name }
                : cat
        ));

        setCategoryForm({ id: null, name: '' });
        setIsEditingCategory(false);
        showAlert('success', 'Categoría actualizada exitosamente');
    };

    const handleEditCategory = (category) => {
        setCategoryForm({ id: category.id, name: category.name });
        setIsEditingCategory(true);
    };

    const handleDeleteCategory = (id) => {
        if (isCategoryInUse(id)) {
            showAlert('error', 'No se puede eliminar una categoría en uso');
            return;
        }

        if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
            setCategories(categories.filter(cat => cat.id !== id));
            showAlert('success', 'Categoría eliminada exitosamente');
        }
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

                {alert.show && (
                    <div className={`rounded-xl p-4 mb-6 flex items-center gap-3 ${
                        alert.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                        {alert.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <span className="font-medium">{alert.message}</span>
                    </div>
                )}

                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setView('sites')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                            view === 'sites'
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                        }`}
                    >
                        Sitios Web
                    </button>
                    <button
                        onClick={() => setView('categories')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                            view === 'categories'
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                        }`}
                    >
                        Categorías
                    </button>
                </div>

                {view === 'sites' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Plus className="w-6 h-6 text-indigo-600" />
                                {isEditingSite ? 'Editar Sitio' : 'Agregar Nuevo Sitio'}
                            </h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Nombre del sitio"
                                        value={siteForm.name}
                                        onChange={(e) => setSiteForm({ ...siteForm, name: e.target.value })}
                                        className="px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <input
                                        type="url"
                                        placeholder="https://ejemplo.com"
                                        value={siteForm.url}
                                        onChange={(e) => setSiteForm({ ...siteForm, url: e.target.value })}
                                        className="px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <select
                                        value={siteForm.categoryId}
                                        onChange={(e) => setSiteForm({ ...siteForm, categoryId: e.target.value })}
                                        className="px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="">Selecciona categoría</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={isEditingSite ? handleUpdateSite : handleCreateSite}
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
                                    >
                                        {isEditingSite ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                        {isEditingSite ? 'Actualizar' : 'Agregar'}
                                    </button>
                                    {isEditingSite && (
                                        <button
                                            onClick={handleCancelSiteEdit}
                                            className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-colors flex items-center gap-2"
                                        >
                                            <X className="w-4 h-4" />
                                            Cancelar
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

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
                                    {sites.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                                                No hay sitios registrados. ¡Agrega tu primer sitio!
                                            </td>
                                        </tr>
                                    ) : (
                                        sites.map(site => (
                                            <tr key={site.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-slate-800">{site.name}</td>
                                                <td className="px-6 py-4">
                                                    <a
                                                        href={site.url}
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
                              {getCategoryName(site.categoryId)}
                            </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleEditSite(site)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="Editar"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteSite(site.id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Eliminar"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'categories' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Plus className="w-6 h-6 text-indigo-600" />
                                {isEditingCategory ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
                            </h2>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        placeholder="Nombre de la categoría"
                                        value={categoryForm.name}
                                        onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                                        className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <button
                                        onClick={isEditingCategory ? handleUpdateCategory : handleCreateCategory}
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
                                    >
                                        {isEditingCategory ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                        {isEditingCategory ? 'Actualizar' : 'Agregar'}
                                    </button>
                                    {isEditingCategory && (
                                        <button
                                            onClick={handleCancelCategoryEdit}
                                            className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-colors flex items-center gap-2"
                                        >
                                            <X className="w-4 h-4" />
                                            Cancelar
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

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
                                    {categories.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-8 text-center text-slate-500">
                                                No hay categorías registradas. ¡Agrega tu primera categoría!
                                            </td>
                                        </tr>
                                    ) : (
                                        categories.map(category => {
                                            const inUse = isCategoryInUse(category.id);
                                            const sitesCount = sites.filter(s => s.categoryId === category.id).length;

                                            return (
                                                <tr key={category.id} className="hover:bg-slate-50 transition-colors">
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
                                                                onClick={() => handleEditCategory(category)}
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                title="Editar"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteCategory(category.id)}
                                                                disabled={inUse}
                                                                className={`p-2 rounded-lg transition-colors ${
                                                                    inUse
                                                                        ? 'text-slate-400 cursor-not-allowed'
                                                                        : 'text-red-600 hover:bg-red-50'
                                                                }`}
                                                                title={inUse ? 'No se puede eliminar (en uso)' : 'Eliminar'}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Catalog;
