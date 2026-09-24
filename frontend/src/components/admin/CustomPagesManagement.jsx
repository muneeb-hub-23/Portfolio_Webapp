import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import CustomPageFrame from '../CustomPageFrame';

const empty = { title: '', path: '', content: '' };
export default function CustomPagesManagement() {
  const [pages, setPages] = useState([]);
  const [form, setForm] = useState(empty);
  const [id, setId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);
  async function load() {
    setLoading(true);
    setError('');
    try { setPages((await api.get('/custom-pages')).data); }
    catch { setError('Unable to load custom pages. Please try again.'); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);
  function reset() { setId(null); setForm(empty); setPreview(false); }
  async function save(event) {
    event.preventDefault();
    setBusy(true);
    try {
      if (id) await api.put(`/custom-pages/${id}`, form);
      else await api.post('/custom-pages', form);
      toast.success(id ? 'Page updated' : 'Page created');
      reset();
      await load();
    } catch (error) { toast.error(error.response?.data?.message || 'Unable to save page'); }
    finally { setBusy(false); }
  }
  async function edit(page) {
    setBusy(true);
    try {
      const { data } = await api.get(`/custom-pages/${page.id}`);
      setForm({ title: data.title, path: data.path, content: data.content });
      setId(data.id);
      setPreview(false);
    } catch { toast.error('Unable to load page'); }
    finally { setBusy(false); }
  }
  async function remove(page) {
    if (!window.confirm(`Delete "${page.title}"? Its link will no longer be available.`)) return;
    setBusy(true);
    try {
      await api.delete(`/custom-pages/${page.id}`);
      if (id === page.id) reset();
      toast.success('Page deleted');
      await load();
    } catch { toast.error('Unable to delete page'); }
    finally { setBusy(false); }
  }
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  return <div className="space-y-6">
    <div><h2 className="text-2xl font-bold">Custom Pages</h2><p className="text-dark-600 mt-2">Create standalone pages with your own HTML. Saving makes the page available at its link.</p></div>
    <form onSubmit={save} className="glass-card p-6 space-y-4">
      <h3 className="text-xl font-semibold">{id ? 'Edit page' : 'Create page'}</h3>
      <fieldset disabled={busy} className="space-y-4 disabled:opacity-60">
        <div><label htmlFor="page-title" className="block mb-2">Page title</label><input id="page-title" name="title" value={form.title} onChange={change} required maxLength={255} className="input-field w-full" placeholder="About us" /></div>
        <div><label htmlFor="page-path" className="block mb-2">Page link</label><input id="page-path" name="path" value={form.path} onChange={change} required maxLength={255} className="input-field w-full" placeholder="/about-us" /><p className="text-sm text-dark-600 mt-2">Enter a path such as /about-us or /services/design. Use letters, numbers and hyphens; paths are saved in lowercase.</p></div>
        <div><label htmlFor="page-content" className="block mb-2">Content (HTML)</label><textarea id="page-content" name="content" value={form.content} onChange={change} required rows={14} spellCheck={false} className="input-field w-full font-mono text-sm" placeholder="<h1>About us</h1><p>Welcome to our page.</p>" /><p className="text-sm text-dark-600 mt-2">Paste an HTML fragment or full document, including CSS (up to 1 MB). Scripts and forms are disabled. For links that open outside the page frame, use target="_top" or target="_blank".</p></div>
        <div className="flex flex-wrap gap-3"><button type="submit" className="btn-primary">{busy ? 'Saving…' : id ? 'Save changes' : 'Create page'}</button><button type="button" onClick={() => setPreview(!preview)} className="btn-secondary">{preview ? 'Hide preview' : 'Preview HTML'}</button>{id && <button type="button" onClick={reset} className="btn-secondary">Cancel editing</button>}</div>
      </fieldset>
      {preview && <CustomPageFrame title={form.title} content={form.content} preview />}
    </form>
    <section className="glass-card p-6 space-y-4"><h3 className="text-xl font-semibold">Saved pages</h3>
      {loading ? <p>Loading pages…</p> : error ? <div role="alert">{error} <button onClick={load} className="btn-secondary">Retry</button></div> : !pages.length ? <p>No custom pages yet.</p> : pages.map((page) => <div key={page.id} className="flex flex-wrap items-center justify-between gap-4 border-b border-dark-200 pb-4">
        <div className="min-w-0"><h4 className="font-semibold break-words">{page.title}</h4><a href={page.path} target="_blank" rel="noopener noreferrer" className="text-primary-500 break-all">{window.location.origin}{page.path}</a></div>
        <div className="flex gap-3"><button disabled={busy} onClick={() => edit(page)} className="btn-secondary">Edit</button><button disabled={busy} onClick={() => remove(page)} className="btn-secondary text-red-500">Delete</button></div>
      </div>)}
    </section>
  </div>;
}
