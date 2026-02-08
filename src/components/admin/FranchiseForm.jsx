import { useState, useEffect } from "react";

const formStyles = `
  .form-card {
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    padding: 1.5rem;
    animation: fadeInForm 0.4s ease-out;
  }
  
  @media (min-width: 768px) {
    .form-card {
      padding: 2rem;
    }
  }
  
  .form-header {
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .form-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1f2937;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .form-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #d1d5db;
    background-color: white;
    transition: all 0.2s;
    font-size: 0.875rem;
  }
  
  .form-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .form-input-error {
    border-color: #f87171;
    background-color: #fef2f2;
  }
  
  .form-input-error:focus {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
  
  .error-message {
    font-size: 0.75rem;
    color: #dc2626;
    animation: shakeError 0.5s ease-in-out;
  }
  
  .form-textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #d1d5db;
    background-color: white;
    transition: all 0.2s;
    font-size: 0.875rem;
    resize: vertical;
    min-height: 5rem;
  }
  
  .form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  @media (min-width: 768px) {
    .form-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .status-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background-color: #f9fafb;
    border-radius: 0.5rem;
  }
  
  .status-info h3 {
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.25rem;
  }
  
  .status-info p {
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 3.5rem;
    height: 2rem;
  }
  
  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #d1d5db;
    transition: .4s;
    border-radius: 2rem;
  }
  
  .toggle-slider:before {
    position: absolute;
    content: "";
    height: 1.5rem;
    width: 1.5rem;
    left: 0.25rem;
    bottom: 0.25rem;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + .toggle-slider {
    background-color: #10b981;
  }
  
  input:checked + .toggle-slider:before {
    transform: translateX(1.5rem);
  }
  
  .submit-button {
    width: 100%;
    padding: 0.75rem 1rem;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .submit-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
  }
  
  .submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  
  .cancel-button {
    color: #6b7280;
    background: none;
    border: none;
    padding: 0.5rem;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .cancel-button:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
  
  .spinner {
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid white;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  /* Shop Link Styles */
  .shop-link-container {
    background-color: #f8fafc;
    border-radius: 0.5rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
  }
  
  .shop-link-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .shop-link-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .shop-link-input-group {
    display: flex;
    gap: 0.5rem;
  }
  
  .shop-link-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    transition: all 0.2s;
  }
  
  .shop-link-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .preview-button {
    padding: 0.75rem 1.5rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
  }
  
  .preview-button:hover {
    background-color: #2563eb;
  }
  
  .preview-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #94a3b8;
  }
  
  .url-helper-text {
    font-size: 0.75rem;
    color: #64748b;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  /* Modal Styles */
  .link-preview-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
    animation: fadeIn 0.3s ease-out;
  }
  
  .link-preview-content {
    background-color: white;
    border-radius: 1rem;
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    overflow: hidden;
    animation: slideIn 0.3s ease-out;
    display: flex;
    flex-direction: column;
  }
  
  .link-preview-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    background-color: #f8fafc;
  }
  
  .link-preview-title {
    font-weight: 600;
    color: #1f2937;
    font-size: 1.125rem;
  }
  
  .close-preview {
    background: none;
    border: none;
    padding: 0.5rem;
    border-radius: 0.375rem;
    cursor: pointer;
    color: #6b7280;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
  }
  
  .close-preview:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
  
  .link-preview-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .link-preview-tabs {
    display: flex;
    border-bottom: 1px solid #e5e7eb;
    background-color: #f9fafb;
  }
  
  .preview-tab {
    padding: 0.75rem 1.5rem;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    font-size: 0.875rem;
    font-weight: 500;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .preview-tab.active {
    color: #3b82f6;
    border-bottom-color: #3b82f6;
    background-color: white;
  }
  
  .preview-tab:hover:not(.active) {
    background-color: #f3f4f6;
  }
  
  .preview-iframe-container {
    flex: 1;
    position: relative;
    min-height: 500px;
  }
  
  .preview-iframe-container.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
    background: white;
  }
  
  .preview-iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  
  .preview-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #6b7280;
  }
  
  .preview-controls {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.5rem;
    z-index: 10;
  }
  
  .preview-control-btn {
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    color: #374151;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    transition: all 0.2s;
  }
  
  .preview-control-btn:hover {
    background-color: #f3f4f6;
    border-color: #9ca3af;
  }
  
  .link-preview-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f9fafb;
  }
  
  .link-url-display {
    font-size: 0.875rem;
    color: #6b7280;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
    background-color: #f1f5f9;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    flex: 1;
    margin-right: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .confirm-link-button {
    padding: 0.5rem 1.5rem;
    background-color: #10b981;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .confirm-link-button:hover {
    background-color: #059669;
  }
  
  .phone-format-hint {
    font-size: 0.75rem;
    color: #3b82f6;
    background-color: #eff6ff;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    margin-top: 0.25rem;
  }
  
  .phone-input-wrapper {
    position: relative;
  }
  
  .phone-counter {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.75rem;
    color: #6b7280;
    background-color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #e5e7eb;
  }
  
  .phone-counter.error {
    color: #dc2626;
    background-color: #fef2f2;
    border-color: #fecaca;
  }
  
  .phone-counter.success {
    color: #059669;
    background-color: #f0fdf4;
    border-color: #bbf7d0;
  }
  
  .no-preview-message {
    padding: 3rem 2rem;
    text-align: center;
    color: #6b7280;
  }
  
  .no-preview-message svg {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
    color: #d1d5db;
  }
  
  @keyframes fadeInForm {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes shakeError {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
    20%, 40%, 60%, 80% { transform: translateX(2px); }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export default function FranchiseForm({ onSubmit, initialData, onCancel, isEditing }) {
  // Set default onSubmit function if not provided
  const defaultOnSubmit = async (data) => {
    console.log('Form submitted with data:', data);
    alert(`Form submitted! Check console for data.\n\nThis is the default handler. Pass your own onSubmit function to handle submission.`);
  };

  // Use provided onSubmit or default
  const handleSubmitFunction = onSubmit || defaultOnSubmit;

  const [form, setForm] = useState({
    shopName: "",
    address: "",
    city: "",
    contact: "",
    lat: 0,
    lng: 0,
    isActive: true,
    shopLink: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneDigits, setPhoneDigits] = useState(0);
  const [showLinkPreview, setShowLinkPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [activeTab, setActiveTab] = useState('preview');
  const [iframeLoading, setIframeLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (initialData) {
      const contactString = Array.isArray(initialData.contact) 
        ? initialData.contact.join(", ") 
        : initialData.contact || "";
      
      // Calculate phone digits on initial load
      const digits = contactString.replace(/\D/g, '').length;
      setPhoneDigits(digits);
      
      setForm({
        shopName: initialData.shopName || "",
        address: initialData.address || "",
        city: initialData.city || "",
        contact: contactString,
        lat: initialData.lat || 0,
        lng: initialData.lng || 0,
        isActive: initialData.isActive !== undefined ? initialData.isActive : true,
        shopLink: initialData.mapLink || "",
      });
    } else {
      setForm({
        shopName: "",
        address: "",
        city: "",
        contact: "",
        lat: 0,
        lng: 0,
        isActive: true,
        shopLink: "",
      });
      setPhoneDigits(0);
    }
    setErrors({});
  }, [initialData]);

  // Phone validation - exactly 10 digits per number
  const validatePhoneNumber = (phone) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10;
  };

  // Real-time phone digit counter
  const handleContactChange = (e) => {
    const value = e.target.value;
    
    // Allow only digits, commas, and spaces
    const cleaned = value.replace(/[^\d, ]/g, '');
    
    // Update form
    setForm({ ...form, contact: cleaned });
    
    // Count digits
    const digits = cleaned.replace(/\D/g, '').length;
    setPhoneDigits(digits);
    
    // Clear error
    if (errors.contact) {
      setErrors({ ...errors, contact: null });
    }
  };

  // Auto-format phone numbers on blur
  const handleContactBlur = () => {
    if (!form.contact) return;
    
    const numbers = form.contact.split(",")
      .map(num => num.replace(/\D/g, ''))
      .filter(num => num.length === 10);
    
    if (numbers.length > 0) {
      const formatted = numbers.join(", ");
      setForm({ ...form, contact: formatted });
      setPhoneDigits(numbers.length * 10);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.shopName.trim()) {
      newErrors.shopName = "Shop name is required";
    }
    
    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }
    
    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }
    
    // STRICT PHONE VALIDATION
    if (!form.contact.trim()) {
      newErrors.contact = "At least one contact number is required";
    } else {
      const contacts = form.contact.split(",").map(v => v.trim()).filter(v => v);
      
      if (contacts.length === 0) {
        newErrors.contact = "At least one contact number is required";
      } else {
        const invalidNumbers = [];
        
        contacts.forEach((phone, index) => {
          const digits = phone.replace(/\D/g, '');
          
          if (digits.length !== 10) {
            invalidNumbers.push({
              index: index + 1,
              number: phone,
              length: digits.length
            });
          }
        });
        
        if (invalidNumbers.length > 0) {
          const errorMessages = invalidNumbers.map(item => 
            `Number ${item.index}: "${item.number}" has ${item.length} digits (needs 10)`
          );
          newErrors.contact = errorMessages.join(". ");
        }
      }
    }
    
    // URL validation - only if provided
    if (form.shopLink && form.shopLink.trim()) {
      try {
        // Add https:// if missing for validation
        let urlString = form.shopLink;
        if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
          urlString = 'https://' + urlString;
        }
        new URL(urlString);
      } catch {
        newErrors.shopLink = "Please enter a valid URL (e.g., https://maps.google.com)";
      }
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Clean phone numbers - keep only digits
      const contacts = form.contact.split(",")
        .map(v => v.replace(/\D/g, ''))
        .filter(v => v.length === 10); // Only include valid 10-digit numbers
      
      const formattedData = {
        shopName: form.shopName,
        address: form.address,
        city: form.city,
        contact: contacts,
        lat: form.lat,
        lng: form.lng,
        isActive: form.isActive,
        mapLink: form.shopLink || undefined,
      };
      
      console.log('Form data being submitted:', formattedData);
      
      // Use the provided onSubmit function or default
      await handleSubmitFunction(formattedData);
      
    } catch (error) {
      console.error('Submit error:', error);
      setErrors({ 
        submit: error.message || "Failed to save. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Parse Google Maps URL and create embed URL
  const getGoogleMapsEmbedUrl = (url) => {
    if (!url) return "";
    
    let cleanUrl = url.trim();
    
    // Add https:// if not present
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    
    // Check if it's a Google Maps URL
    if (cleanUrl.includes('google.com/maps') || cleanUrl.includes('maps.google.com')) {
      // Try to convert to embed URL
      try {
        const urlObj = new URL(cleanUrl);
        const params = new URLSearchParams(urlObj.search);
        
        // Extract coordinates from different Google Maps URL formats
        let embedUrl = "";
        
        // Format 1: https://www.google.com/maps/place/...
        if (cleanUrl.includes('/place/')) {
          const placeMatch = cleanUrl.match(/\/place\/([^/@]+)/);
          if (placeMatch) {
            embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(placeMatch[1])}`;
          }
        }
        // Format 2: https://www.google.com/maps?q=lat,lng
        else if (params.has('q')) {
          const q = params.get('q');
          if (q.includes(',')) {
            embedUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${q}&zoom=15`;
          } else {
            embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(q)}`;
          }
        }
        // Format 3: https://www.google.com/maps/@lat,lng,zoomz
        else if (cleanUrl.includes('/@')) {
          const coordsMatch = cleanUrl.match(/@([-0-9.]+),([-0-9.]+)/);
          if (coordsMatch) {
            const lat = coordsMatch[1];
            const lng = coordsMatch[2];
            embedUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${lat},${lng}&zoom=15`;
          }
        }
        
        if (embedUrl) return embedUrl;
      } catch (e) {
        console.error('Error parsing Google Maps URL:', e);
      }
    }
    
    // If not Google Maps or can't parse, return original URL
    return cleanUrl;
  };

  // Preview link function with embedded Google Maps
  const previewLink = () => {
    if (!form.shopLink) return;
    
    // Get embed URL
    const embedUrl = getGoogleMapsEmbedUrl(form.shopLink);
    setPreviewUrl(embedUrl);
    setShowLinkPreview(true);
    setIframeLoading(true);
    setActiveTab('preview');
  };

  // Close preview modal
  const closePreview = () => {
    setShowLinkPreview(false);
    setPreviewUrl("");
    setIframeLoading(false);
    setIsFullscreen(false);
  };

  // Confirm and use this link
  const confirmLink = () => {
    setShowLinkPreview(false);
  };

  // Handle iframe load
  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Format phone display
  const formatPhoneDisplay = (value) => {
    if (!value) return "";
    
    const numbers = value.split(",").map(num => num.trim()).filter(num => num);
    
    return numbers.map(num => {
      const digits = num.replace(/\D/g, '');
      if (digits.length === 10) {
        return `${digits.substring(0, 3)}-${digits.substring(3, 6)}-${digits.substring(6)}`;
      }
      return digits;
    }).join(", ");
  };

  // Format current display
  const currentFormattedPhones = formatPhoneDisplay(form.contact);

  // Check if URL is Google Maps
  const isGoogleMapsUrl = (url) => {
    if (!url) return false;
    return url.includes('google.com/maps') || url.includes('maps.google.com');
  };

  return (
    <>
      <style>{formStyles}</style>
      
      {/* Preview Modal */}
      {showLinkPreview && (
        <div className="link-preview-modal" onClick={closePreview}>
          <div className="link-preview-content" onClick={(e) => e.stopPropagation()}>
            <div className="link-preview-header">
              <div className="link-preview-title">
                <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Location Preview
              </div>
              <button
                type="button"
                onClick={closePreview}
                className="close-preview"
              >
                ✕
              </button>
            </div>
            
            <div className="link-preview-body">
              <div className="link-preview-tabs">
                <button
                  className={`preview-tab ${activeTab === 'preview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('preview')}
                >
                  Preview
                </button>
                <button
                  className={`preview-tab ${activeTab === 'info' ? 'active' : ''}`}
                  onClick={() => setActiveTab('info')}
                >
                  Link Info
                </button>
              </div>
              
              <div className="preview-iframe-container" style={{ height: isFullscreen ? '100vh' : '500px' }}>
                {activeTab === 'preview' ? (
                  <>
                    {iframeLoading && (
                      <div className="preview-loading">
                        <svg className="spinner" style={{ width: '2rem', height: '2rem', marginBottom: '1rem' }} viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <p>Loading preview...</p>
                      </div>
                    )}
                    
                    <div className="preview-controls">
                      <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="preview-control-btn"
                      >
                        <svg style={{ width: '0.75rem', height: '0.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {isFullscreen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          )}
                        </svg>
                        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                      </button>
                      <button
                        type="button"
                        onClick={() => window.open(previewUrl, '_blank')}
                        className="preview-control-btn"
                      >
                        <svg style={{ width: '0.75rem', height: '0.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Open in New Tab
                      </button>
                    </div>
                    
                    {isGoogleMapsUrl(form.shopLink) ? (
                      <iframe
                        src={previewUrl}
                        title="Google Maps Preview"
                        className="preview-iframe"
                        onLoad={handleIframeLoad}
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
                        style={{ display: iframeLoading ? 'none' : 'block' }}
                      />
                    ) : (
                      <div className="no-preview-message">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <h3>Direct Link Preview</h3>
                        <p>This link will open in a new tab when users click it.</p>
                        <button
                          type="button"
                          onClick={() => window.open(previewUrl, '_blank')}
                          className="preview-control-btn"
                          style={{ marginTop: '1rem' }}
                        >
                          Open Link in New Tab
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ padding: '2rem' }}>
                    <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>Link Information</h3>
                    <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem' }}>
                      <p style={{ marginBottom: '0.5rem' }}>
                        <strong>Original URL:</strong> {form.shopLink}
                      </p>
                      <p style={{ marginBottom: '0.5rem' }}>
                        <strong>Type:</strong> {isGoogleMapsUrl(form.shopLink) ? 'Google Maps' : 'Website Link'}
                      </p>
                      {isGoogleMapsUrl(form.shopLink) && (
                        <p>
                          <strong>Preview:</strong> Embedded Google Maps view
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="link-preview-footer">
              <div className="link-url-display" title={form.shopLink}>
                {form.shopLink}
              </div>
              <button
                type="button"
                onClick={confirmLink}
                className="confirm-link-button"
              >
                <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Use This Link
              </button>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 className="form-title">
              <svg style={{ width: '1.5rem', height: '1.5rem', color: '#3b82f6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {isEditing ? "Edit Outlet" : "Add New Outlet"}
            </h2>
            {onCancel && isEditing && (
              <button
                type="button"
                onClick={onCancel}
                className="cancel-button"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        <div className="form-content">
          {/* Shop Name */}
          <div className="form-group">
            <label className="form-label">Shop Name *</label>
            <input
              type="text"
              placeholder="e.g., Downtown Cafe"
              className={`form-input ${errors.shopName ? 'form-input-error' : ''}`}
              value={form.shopName}
              onChange={e => {
                setForm({ ...form, shopName: e.target.value });
                if (errors.shopName) setErrors({ ...errors, shopName: null });
              }}
            />
            {errors.shopName && <p className="error-message">{errors.shopName}</p>}
          </div>

          {/* Address */}
          <div className="form-group">
            <label className="form-label">Address *</label>
            <textarea
              placeholder="Full address with landmark"
              className={`form-textarea ${errors.address ? 'form-input-error' : ''}`}
              value={form.address}
              onChange={e => {
                setForm({ ...form, address: e.target.value });
                if (errors.address) setErrors({ ...errors, address: null });
              }}
            />
            {errors.address && <p className="error-message">{errors.address}</p>}
          </div>

          {/* City & Contact Grid */}
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">City *</label>
              <input
                type="text"
                placeholder="e.g., New York"
                className={`form-input ${errors.city ? 'form-input-error' : ''}`}
                value={form.city}
                onChange={e => {
                  setForm({ ...form, city: e.target.value });
                  if (errors.city) setErrors({ ...errors, city: null });
                }}
              />
              {errors.city && <p className="error-message">{errors.city}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">
                <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Numbers * (10 digits each)
              </label>
              <div className="phone-input-wrapper">
                <input
                  type="text"
                  placeholder="e.g., 9876543210, 9123456789"
                  className={`form-input ${errors.contact ? 'form-input-error' : ''}`}
                  value={form.contact}
                  onChange={handleContactChange}
                  onBlur={handleContactBlur}
                />
                <div className={`phone-counter ${phoneDigits > 0 && phoneDigits % 10 === 0 ? 'success' : 'error'}`}>
                  {phoneDigits} digit{phoneDigits !== 1 ? 's' : ''}
                </div>
              </div>
              {errors.contact && <p className="error-message">{errors.contact}</p>}
              {form.contact && currentFormattedPhones && (
                <div className="phone-format-hint">
                  <svg style={{ width: '0.75rem', height: '0.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Formatted: {currentFormattedPhones}
                </div>
              )}
              <p className="url-helper-text">
                <svg style={{ width: '0.75rem', height: '0.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Enter 10-digit numbers separated by commas
              </p>
            </div>
          </div>

          {/* Coordinates Grid */}
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Latitude</label>
              <input
                type="number"
                step="any"
                placeholder="e.g., 40.7128"
                className="form-input"
                value={form.lat}
                onChange={e => setForm({ ...form, lat: parseFloat(e.target.value) || 0 })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Longitude</label>
              <input
                type="number"
                step="any"
                placeholder="e.g., -74.0060"
                className="form-input"
                value={form.lng}
                onChange={e => setForm({ ...form, lng: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          {/* Shop Link with Preview Button */}
          <div className="shop-link-container">
            <div className="shop-link-header">
              <div className="shop-link-title">
                <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Shop Link (Optional)
              </div>
            </div>
            
            <div className="shop-link-input-group">
              <input
                type="url"
                placeholder="Paste Google Maps or website link (https://maps.google.com/?q=...)"
                className={`shop-link-input ${errors.shopLink ? 'form-input-error' : ''}`}
                value={form.shopLink}
                onChange={e => {
                  setForm({ ...form, shopLink: e.target.value });
                  if (errors.shopLink) setErrors({ ...errors, shopLink: null });
                }}
              />
              <button
                type="button"
                onClick={previewLink}
                disabled={!form.shopLink}
                className="preview-button"
              >
                <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </button>
            </div>
            {errors.shopLink && <p className="error-message">{errors.shopLink}</p>}
            <p className="url-helper-text">
              <svg style={{ width: '0.75rem', height: '0.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {form.shopLink && isGoogleMapsUrl(form.shopLink) 
                ? "Google Maps link detected! Preview shows embedded map." 
                : "Paste Google Maps, website, or social media link."}
            </p>
          </div>

          {/* Active Toggle */}
          <div className="status-toggle">
            <div className="status-info">
              <h3>Outlet Status</h3>
              <p>Activate or deactivate this outlet</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={e => setForm({ ...form, isActive: e.target.checked })}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="form-group">
              <p className="error-message" style={{ textAlign: 'center' }}>
                {errors.submit}
              </p>
            </div>
          )}

          {/* Info message if using default handler */}
          {!onSubmit && (
            <div className="form-group">
              <div className="phone-format-hint" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
                <svg style={{ width: '0.75rem', height: '0.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Using default handler. Pass an onSubmit function to handle form submission.
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                Saving...
              </>
            ) : (
              <>
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {isEditing ? "Update Outlet" : "Create Outlet"}
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}