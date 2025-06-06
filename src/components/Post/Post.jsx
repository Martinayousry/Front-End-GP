// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../Context/AuthContext";

// const Post = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [newPost, setNewPost] = useState({
//     title: '',
//     breed: '',
//     age: '',
//     gender: '',
//     lostDate: '',
//     lostLocation: '',
//     description: '',
//   });
//   const [previewImages, setPreviewImages] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const fileInputRef = useRef(null);
//   const { token } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await fetch('/api/Posts', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (!response.ok) throw new Error('Failed to fetch posts');
//       const data = await response.json();
//       setPosts(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewPost(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
    
//     // Create previews for selected images
//     const previews = files.map(file => ({
//       file,
//       preview: URL.createObjectURL(file)
//     }));
    
//     setPreviewImages(prev => [...prev, ...previews]);
//   };

//   const removeImage = (index) => {
//     const newPreviews = [...previewImages];
//     URL.revokeObjectURL(newPreviews[index].preview);
//     newPreviews.splice(index, 1);
//     setPreviewImages(newPreviews);
//   };

//   const uploadImages = async (files) => {
//     const formData = new FormData();
//     files.forEach(file => {
//       formData.append('images', file);
//     });

//     try {
//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formData
//       });

//       if (!response.ok) throw new Error('Failed to upload images');
//       return await response.json();
//     } catch (err) {
//       throw err;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUploading(true);
    
//     try {
//       // First upload images if any
//       let photoUrls = [];
//       if (previewImages.length > 0) {
//         const uploaded = await uploadImages(previewImages.map(img => img.file));
//         photoUrls = uploaded.urls || [];
//       }

//       // Then create the post
//       const response = await fetch('/api/Posts', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           ...newPost,
//           photoUrls
//         })
//       });

//       if (!response.ok) throw new Error('Failed to create post');
      
//       const createdPost = await response.json();
//       setPosts([createdPost, ...posts]);
//       setShowModal(false);
//       setNewPost({
//         title: '',
//         breed: '',
//         age: '',
//         gender: '',
//         lostDate: '',
//         lostLocation: '',
//         description: '',
//       });
//       setPreviewImages([]);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setUploading(false);
//     }
//   };
//   const handleChatClick = (ownerId) => {
//     alert(`Redirecting to chat page with owner ID: ${ownerId}`);
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   if (loading) return <div className="text-center py-8 text-lg">Loading posts...</div>;
//   if (error) return <div className="text-center py-8 text-red-500 text-lg">Error: {error}</div>;

  
//   return (
//     <div className="w-full px-4 pt-24 pb-8 max-w-screen-2xl mx-auto relative">
//       {/* Add Post Button */}
//       <button 
//         onClick={() => setShowModal(true)}
//         className="fixed right-8 bottom-8 bg-[#749260] hover:bg-[#658153] text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center"
//         style={{ width: '60px', height: '60px' }}
//       >
//         <i className="fas fa-plus text-2xl"></i>
//       </button>

//       {/* Blurred background when modal is open */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"></div>
//       )}

//       <h1 className="text-3xl font-bold mb-8 text-center text-[#749260]">Lost Dog Posts</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
//         {posts.map(post => (
//           <div 
//             key={post.postId} 
//             className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg w-full border-t-4 border-[#749260]"
//           >
//             {/* Card Header */}
//             <div className="p-5 border-b">
//               <h2 className="text-sm font-medium text-[#749260] relative">
//                 <span className="absolute w-5 h-px bg-[#749260] top-[-16px] left-0"></span>
//                 <strong>LOST DOG</strong> POST
//               </h2>
//             </div>
            
//             {/* Card Body */}
//             <div className="p-5">
//               <h3 className="text-xl font-semibold mb-2 flex items-center text-[#749260]">
//                 {post.title} 
//                 <span className="ml-2 bg-[#749260]/10 text-[#749260] text-xs font-bold px-2.5 py-0.5 rounded-full uppercase border border-[#749260]/20">
//                   LOST
//                 </span>
//               </h3>
              
//               {/* Dog Image */}
//               <div className="relative h-64 overflow-hidden rounded-lg mb-4 group">
//                 {post.photoUrls?.length > 0 ? (
//                   <img 
//                     src={post.photoUrls[0]} 
//                     alt={`Lost Dog ${post.title}`}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-[#749260]/10 flex items-center justify-center text-[#749260]">
//                     No Image Available
//                   </div>
//                 )}
//               </div>

//               {/* Dog Information */}
//               <div className="space-y-4 mb-6">
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <p className="font-semibold text-[#749260]">Breed:</p>
//                     <p>{post.breed}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-[#749260]">Age:</p>
//                     <p>{post.age} years</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-[#749260]">Lost Date:</p>
//                     <p>{formatDate(post.lostDate)}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-[#749260]">Gender:</p>
//                     <p>{post.gender}</p>
//                   </div>
//                 </div>
                
//                 <div>
//                   <p className="font-semibold text-[#749260]">Lost Location:</p>
//                   <p>{post.lostLocation}</p>
//                 </div>
                
//                 <div>
//                   <p className="font-semibold text-[#749260]">Description:</p>
//                   <p className="mt-1">{post.description}</p>
//                 </div>
//               </div>
              
//               {/* Contact Information - Now at the bottom */}
//               <div className="bg-[#f8faf7] p-4 rounded-lg border border-[#749260]/20">
//                 <h4 className="text-sm font-semibold text-[#749260] mb-3 flex items-center">
//                   <i className="fas fa-id-card mr-2"></i>
//                   CONTACT OWNER
//                 </h4>
//                 <ul className="space-y-3 text-sm">
//                   <li className="flex items-center">
//                     <div className="w-8 h-8 rounded-full bg-[#749260]/10 flex items-center justify-center mr-3">
//                       <i className="fas fa-user text-[#749260]"></i>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Posted By</p>
//                       <p className="font-medium">{post.owner.userName}</p>
//                     </div>
//                   </li>
                  
//                   {post.owner.email && (
//                     <li className="flex items-center">
//                       <div className="w-8 h-8 rounded-full bg-[#749260]/10 flex items-center justify-center mr-3">
//                         <i className="fas fa-envelope text-[#749260]"></i>
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500">Email</p>
//                         <a href={`mailto:${post.owner.email}`} className="font-medium hover:underline">
//                           {post.owner.email}
//                         </a>
//                       </div>
//                     </li>
//                   )}
                  
//                   {post.owner.phoneNumber && (
//                     <li className="flex items-center">
//                       <div className="w-8 h-8 rounded-full bg-[#749260]/10 flex items-center justify-center mr-3">
//                         <i className="fas fa-phone text-[#749260]"></i>
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500">Phone</p>
//                         <a href={`tel:${post.owner.phoneNumber}`} className="font-medium hover:underline">
//                           {post.owner.phoneNumber}
//                         </a>
//                       </div>
//                     </li>
//                   )}
//                 </ul>
                
//                 <button 
//                   onClick={() => navigate(`/Chat/${post.owner.id}`)}
//                   className="w-full mt-4 bg-[#749260] hover:bg-[#658153] text-white py-2 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
//                 >
//                   <i className="fas fa-comment-dots mr-2"></i> Message Owner
//                 </button>


//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//      {/* Add Post Modal */}
//      {showModal && (
//   <>
//     {/* Blurred background */}
//     <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"></div>
    
//     {/* Modal content */}
//     <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-5 border-b border-[#749260]/20 flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-[#749260]">Create New Lost Dog Post</h2>
//           <button 
//             onClick={() => {
//               setShowModal(false);
//               previewImages.forEach(img => URL.revokeObjectURL(img.preview));
//               setPreviewImages([]);
//             }}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <i className="fas fa-times text-xl"></i>
//           </button>
//         </div>
            
//             <form onSubmit={handleSubmit} className="p-5">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Left column */}
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-[#749260] mb-1">Title*</label>
//                     <input
//                       type="text"
//                       name="title"
//                       value={newPost.title}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#749260]"
//                       required
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-[#749260] mb-1">Breed*</label>
//                     <input
//                       type="text"
//                       name="breed"
//                       value={newPost.breed}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#749260]"
//                       required
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-[#749260] mb-1">Age*</label>
//                     <input
//                       type="number"
//                       name="age"
//                       value={newPost.age}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#749260]"
//                       required
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-[#749260] mb-1">Gender*</label>
//                     <select
//                       name="gender"
//                       value={newPost.gender}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#749260]"
//                       required
//                     >
//                       <option value="">Select Gender</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                     </select>
//                   </div>
//                 </div>
                
//                 {/* Right column */}
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-[#749260] mb-1">Lost Date*</label>
//                     <input
//                       type="date"
//                       name="lostDate"
//                       value={newPost.lostDate}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#749260]"
//                       required
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-[#749260] mb-1">Lost Location*</label>
//                     <input
//                       type="text"
//                       name="lostLocation"
//                       value={newPost.lostLocation}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#749260]"
//                       required
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-[#749260] mb-1">Upload Photos</label>
//                     <div 
//                       className="border-2 border-dashed border-[#749260]/50 rounded-lg p-4 text-center cursor-pointer hover:bg-[#749260]/5 transition-colors"
//                       onClick={() => fileInputRef.current.click()}
//                     >
//                       <i className="fas fa-cloud-upload-alt text-[#749260] text-2xl mb-2"></i>
//                       <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
//                       <p className="text-xs text-gray-500">JPG, PNG up to 5MB</p>
//                       <input
//                         type="file"
//                         ref={fileInputRef}
//                         onChange={handleFileChange}
//                         className="hidden"
//                         multiple
//                         accept="image/*"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Image previews */}
//               {previewImages.length > 0 && (
//                 <div className="mt-6">
//                   <label className="block text-sm font-medium text-[#749260] mb-2">Selected Photos</label>
//                   <div className="flex flex-wrap gap-3">
//                     {previewImages.map((img, index) => (
//                       <div key={index} className="relative group">
//                         <img 
//                           src={img.preview} 
//                           alt={`Preview ${index}`}
//                           className="w-20 h-20 object-cover rounded-md"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeImage(index)}
//                           className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           <i className="fas fa-times text-xs"></i>
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
              
//               <div className="mt-6">
//                 <label className="block text-sm font-medium text-[#749260] mb-1">Description*</label>
//                 <textarea
//                   name="description"
//                   value={newPost.description}
//                   onChange={handleInputChange}
//                   rows="4"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#749260]"
//                   required
//                 ></textarea>
//               </div>
              
//               <div className="mt-8 flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowModal(false);
//                     previewImages.forEach(img => URL.revokeObjectURL(img.preview));
//                     setPreviewImages([]);
//                   }}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-[#749260] hover:bg-[#658153] text-white rounded-md flex items-center"
//                   disabled={uploading}
//                 >
//                   {uploading ? (
//                     <>
//                       <i className="fas fa-spinner fa-spin mr-2"></i>
//                       Creating...
//                     </>
//                   ) : (
//                     'Create Post'
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Post;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    breed: '',
    age: '',
    gender: '',
    lostDate: '',
    lostLocation: '',
    description: '',
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/Posts', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Create previews for selected images
    const previews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setPreviewImages(prev => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    const newPreviews = [...previewImages];
    URL.revokeObjectURL(newPreviews[index].preview);
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };

  const uploadImages = async (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('/api/Posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to upload images');
      return await response.json();
    } catch (err) {
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      // Create FormData for the multipart request
      const formData = new FormData();
      
      // Append all post data fields
      formData.append('Title', newPost.title);
      formData.append('Description', newPost.description);
      formData.append('Breed', newPost.breed);
      formData.append('Age', newPost.age);
      formData.append('LostDate', newPost.lostDate);
      formData.append('LostLocation', newPost.lostLocation);
      formData.append('Gender', newPost.gender);
      
      // Append all image files
      previewImages.forEach((img, index) => {
        formData.append('Photos', img.file);
      });
  
      // Make a single POST request with all data
      const response = await fetch('/api/Posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type header - let the browser set it with the correct boundary
        },
        body: formData
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create post');
      }
      
      const createdPost = await response.json();
      setPosts([createdPost, ...posts]);
      setShowModal(false);
      setNewPost({
        title: '',
        breed: '',
        age: '',
        gender: '',
        lostDate: '',
        lostLocation: '',
        description: '',
      });
      setPreviewImages([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleChatClick = (ownerId) => {
    navigate(`/Chat/${ownerId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <div className="text-center py-8 text-lg">Loading posts...</div>;
  if (error) return <div className="text-center py-8 text-red-500 text-lg">Error: {error}</div>;

  return (
    <div className="w-full px-4 pt-24 pb-8 max-w-screen-2xl mx-auto relative">
      {/* Add Post Button */}
      <button 
        onClick={() => setShowModal(true)}
        className="fixed right-8 bottom-8 bg-[#749260] hover:bg-[#658153] text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center"
        style={{ width: '60px', height: '60px' }}
      >
        <i className="fas fa-plus text-2xl"></i>
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center text-[#749260]">Lost Dog Posts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {posts.map(post => (
          <div 
            key={post.postId} 
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg w-full border-t-4 border-[#749260]"
          >
            {/* Card Header */}
            <div className="p-5 border-b">
              <h2 className="text-sm font-medium text-[#749260] relative">
                <span className="absolute w-5 h-px bg-[#749260] top-[-16px] left-0"></span>
                <strong>LOST DOG</strong> POST
              </h2>
            </div>
            
            {/* Card Body */}
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2 flex items-center text-[#749260]">
                {post.title} 
                <span className="ml-2 bg-[#749260]/10 text-[#749260] text-xs font-bold px-2.5 py-0.5 rounded-full uppercase border border-[#749260]/20">
                  LOST
                </span>
              </h3>
              
              {/* Dog Image */}
             {/* Dog Image - Updated with larger size */}
<div className="relative h-96 overflow-hidden rounded-lg mb-4 group"> {/* Changed from h-64 to h-96 */}
  {post.photoUrls?.length > 0 ? (
    <img 
      src={post.photoUrls[0]} 
      alt={`Lost Dog ${post.title}`}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  ) : (
    <div className="w-full h-full bg-[#749260]/10 flex items-center justify-center text-[#749260]">
      No Image Available
    </div>
  )}
</div>
              {/* Dog Information */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-[#749260]">Breed:</p>
                    <p>{post.breed}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#749260]">Age:</p>
                    <p>{post.age} years</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#749260]">Lost Date:</p>
                    <p>{formatDate(post.lostDate)}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#749260]">Gender:</p>
                    <p>{post.gender}</p>
                  </div>
                </div>
                
                <div>
                  <p className="font-semibold text-[#749260]">Lost Location:</p>
                  <p>{post.lostLocation}</p>
                </div>
                
                <div>
                  <p className="font-semibold text-[#749260]">Description:</p>
                  <p className="mt-1">{post.description}</p>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="bg-[#f8faf7] p-4 rounded-lg border border-[#749260]/20">
                <h4 className="text-sm font-semibold text-[#749260] mb-3 flex items-center">
                  <i className="fas fa-id-card mr-2"></i>
                  CONTACT OWNER
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#749260]/10 flex items-center justify-center mr-3">
                      <i className="fas fa-user text-[#749260]"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Posted By</p>
                      <p className="font-medium">{post.owner.userName}</p>
                    </div>
                  </li>
                  
                  {post.owner.email && (
                    <li className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#749260]/10 flex items-center justify-center mr-3">
                        <i className="fas fa-envelope text-[#749260]"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <a href={`mailto:${post.owner.email}`} className="font-medium hover:underline">
                          {post.owner.email}
                        </a>
                      </div>
                    </li>
                  )}
                  
                  {post.owner.phoneNumber && (
                    <li className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#749260]/10 flex items-center justify-center mr-3">
                        <i className="fas fa-phone text-[#749260]"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <a href={`tel:${post.owner.phoneNumber}`} className="font-medium hover:underline">
                          {post.owner.phoneNumber}
                        </a>
                      </div>
                    </li>
                  )}
                </ul>
                
                <button 
                  onClick={() => handleChatClick(post.owner.id)}
                  className="w-full mt-4 bg-[#749260] hover:bg-[#658153] text-white py-2 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
                >
                  <i className="fas fa-comment-dots mr-2"></i> Message Owner
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Post Modal with Blurred Background */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"></div>
          
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-5 border-b border-[#749260]/20 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-[#749260]">Create New Lost Dog Post</h2>
                <button 
                  onClick={() => {
                    setShowModal(false);
                    previewImages.forEach(img => URL.revokeObjectURL(img.preview));
                    setPreviewImages([]);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#749260] mb-1">Title*</label>
                      <input
                        type="text"
                        name="title"
                        value={newPost.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#749260]"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#749260] mb-1">Breed*</label>
                      <input
                        type="text"
                        name="breed"
                        value={newPost.breed}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#749260]"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#749260] mb-1">Age*</label>
                      <input
                        type="number"
                        name="age"
                        value={newPost.age}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#749260]"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#749260] mb-1">Gender*</label>
                      <select
                        name="gender"
                        value={newPost.gender}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#749260]"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#749260] mb-1">Lost Date*</label>
                      <input
                        type="date"
                        name="lostDate"
                        value={newPost.lostDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#749260]"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#749260] mb-1">Lost Location*</label>
                      <input
                        type="text"
                        name="lostLocation"
                        value={newPost.lostLocation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#749260]"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#749260] mb-1">Upload Photos</label>
                      <div 
                        className="border-2 border-dashed border-[#749260]/50 rounded-lg p-4 text-center cursor-pointer hover:bg-[#749260]/5 transition-colors"
                        onClick={() => fileInputRef.current.click()}
                      >
                        <i className="fas fa-cloud-upload-alt text-[#749260] text-2xl mb-2"></i>
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">JPG, PNG up to 5MB</p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                          multiple
                          accept="image/*"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {previewImages.length > 0 && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-[#749260] mb-2">Selected Photos</label>
                    <div className="flex flex-wrap gap-3">
                      {previewImages.map((img, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={img.preview} 
                            alt={`Preview ${index}`}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <i className="fas fa-times text-xs"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-[#749260] mb-1">Description*</label>
                  <textarea
                    name="description"
                    value={newPost.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#749260]"
                    required
                  ></textarea>
                </div>
                
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      previewImages.forEach(img => URL.revokeObjectURL(img.preview));
                      setPreviewImages([]);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#749260] hover:bg-[#658153] text-white rounded-md flex items-center"
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Creating...
                      </>
                    ) : (
                      'Create Post'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;