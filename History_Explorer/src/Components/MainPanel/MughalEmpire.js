import React, { useState, useEffect } from 'react';
import Gallery from './Gallery';
import './MughalEmpire.css';

const rulers = [
  { label: 'Mughal Empire (Overview)', title: 'Mughal_Empire' },
  { label: 'Babur', title: 'Babur' },
  { label: 'Humayun', title: 'Humayun' },
  { label: 'Akbar', title: 'Akbar' },
  { label: 'Jahangir', title: 'Jahangir' },
  { label: 'Shah Jahan', title: 'Shah_Jahan' },
  { label: 'Aurangzeb', title: 'Aurangzeb' },
];

function MughalEmpire() {
  const [selectedTitle, setSelectedTitle] = useState('Mughal_Empire');
  const [wikiContent, setWikiContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedTitle) return;

    fetch(`https://en.wikipedia.org/w/api.php?action=parse&page=${selectedTitle}&format=json&origin=*&prop=text&formatversion=2`)
      .then(res => res.json())
      .then(data => {
        const html = data.parse?.text || '';

        // Create a temporary DOM element to parse HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const selectorsToRemove = [
          '.hatnote',
          '.infobox',
          '.metadata',
          '.ambox',
          '.navbox',
          '.mw-references-wrap',
          '.reflist',
          '.reference',
          'style',
          'script',
          '.mw-editsection', // Edit links next to headings
          'sup.reference',   // Inline [1], [2], etc.
          'table',           // Reference tables and citation listings
          'ul',              // Some "See also" style lists
          'dl',              // Source listings with DOI/ISSN/ISBN
          'ol'               // Ordered citations
        ];
        selectorsToRemove.forEach(selector => {
          doc.querySelectorAll(selector).forEach(el => el.remove());
        });
        document.querySelectorAll('.sistersitebox, .plainlist, .metadata').forEach(el => {
          if (el.innerText?.includes('Wikiquote') || el.innerText?.includes('Wikimedia Commons')) {
            el.remove();
          }
        });
        
        // Remove links specifically pointing to wikiquote.org or Wikimedia sites
        document.querySelectorAll('a').forEach(link => {
          if (
            link.href.includes('wikiquote.org') ||
            link.href.includes('wikimedia.org') ||
            link.href.includes('commons.wikimedia.org')
          ) {
            const parent = link.closest('div, p, li, table'); // Remove entire block around the link
            if (parent) parent.remove();
          }
        });

        const sectionHeadingsToRemove = ['See also', 'References', 'Footnotes', 'Citations', 'List of emperors',
          'Sources', 'Further reading', 'Culture', 'Society and economy', 'Primary sources', 'Older histories', 'External links',
          'Books', 'In popular culture',
          'Films and television',
          'Fiction',
          'Video games',
          'Notes'];
        doc.querySelectorAll('h2, h3').forEach(heading => {
          const headingText = heading.textContent?.trim();
          if (sectionHeadingsToRemove.includes(headingText)) {
            let el = heading.nextElementSibling;
            heading.remove();

            // Remove heading and all elements after it until the next heading
            while (el && !/^H[23]$/.test(el.tagName)) {
              const next = el.nextElementSibling;
              el.remove();
              el = next;
            }
          }
        });

        // Find headings and assign id attributes for anchor links
        const headings = [...doc.querySelectorAll('h2, h3')];
        headings.forEach(heading => {
          const id = heading.textContent?.toLowerCase().replace(/[^\w]+/g, '-');
          heading.id = id;
          heading.classList.add('wiki-heading');
        });

        setWikiContent(doc.body.innerHTML);
        setError('');
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load Wikipedia content');
        setWikiContent('');
      });
  }, [selectedTitle]);

  return (
    <div style={{ fontSize: '13px', marginLeft: '15px', paddingRight: '15px' }}>
      <h2>Mughal Empire History</h2>

      <label>
        <strong>Select a Mughal Ruler:</strong>
        <select className='ruler-select'
          value={selectedTitle}
          onChange={(e) => setSelectedTitle(e.target.value)}
          style={{ marginLeft: '10px', padding: '4px', fontSize: '13px' }}
        >
          {rulers.map((ruler) => (
            <option key={ruler.title} value={ruler.title}>
              {ruler.label}
            </option>
          ))}
        </select>
      </label>

      <div style={{ marginTop: '1.5vw' }}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!wikiContent && !error && <p>Loading historical content from Wikipedia...</p>}

        {wikiContent && (
          <div dangerouslySetInnerHTML={{ __html: wikiContent }} />
        )}
      </div>
      <Gallery title={selectedTitle}></Gallery>
    </div>
  );
}

export default MughalEmpire;
