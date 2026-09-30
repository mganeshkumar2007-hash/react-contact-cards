const { useState } = React;

function ContactCard({ contact, onDelete }) {
  return (
    <div className="contact-card">
      <div className="card-avatar">
        {contact.name.charAt(0).toUpperCase()}
      </div>
      <div className="card-info">
        <h3>{contact.name}</h3>
        <p className="card-role">{contact.role || "Member"}</p>
        <p className="card-detail">📧 {contact.email}</p>
        <p className="card-detail">📞 {contact.phone}</p>
      </div>
      <button 
        className="delete-btn" 
        onClick={() => onDelete(contact.id)}
        title="Delete contact"
      >
        ✕
      </button>
    </div>
  );
}

function ContactForm({ onAddContact }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Frontend Developer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      return;
    }

    onAddContact({
      id: Date.now(),
      ...formData,
    });

    setFormData({ name: "", email: "", phone: "", role: "Frontend Developer" });
  };

  return (
    <div className="glass-panel form-panel">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit} className="contact-input-form">
        <div className="input-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Full Name</label>
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Email Address</label>
        </div>

        <div className="input-group">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Phone Number</label>
        </div>

        <div className="input-group">
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
          </select>
        </div>

        <button type="submit" className="btn primary-btn">
          Add Contact Card +
        </button>
      </form>
    </div>
  );
}

function UserList({ contacts, onDeleteContact }) {
  return (
    <div className="glass-panel list-panel">
      <div className="list-header">
        <h2>Contact Directory</h2>
        <span className="counter-badge">{contacts.length} Contacts</span>
      </div>

      {contacts.length === 0 ? (
        <div className="empty-state">
          <p>No contacts added yet. Use the form on the left to add one!</p>
        </div>
      ) : (
        <div className="cards-grid">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={onDeleteContact}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Ganesh Kumar",
      email: "ganesh@example.com",
      phone: "+91 98765 43210",
      role: "Frontend Developer",
    },
    {
      id: 2,
      name: "Aarav Sharma",
      email: "aarav.dev@example.com",
      phone: "+91 91234 56789",
      role: "Full Stack Developer",
    },
  ]);

  const handleAddContact = (newContact) => {
    setContacts((prev) => [newContact, ...prev]);
  };

  const handleDeleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  return (
    <div className="app-wrapper">
      <div className="background-decorations">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>

      <header className="app-header">
        <h1>Contact<span>Hub</span></h1>
        <p>Modular React SPA with Dynamic Contact Cards</p>
      </header>

      <main className="main-content">
        <ContactForm onAddContact={handleAddContact} />
        <UserList
          contacts={contacts}
          onDeleteContact={handleDeleteContact}
        />
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);