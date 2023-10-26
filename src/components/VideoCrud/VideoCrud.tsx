/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 26/10/2023 23:31:29
*/
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { getVideos } from '../../api/api-video';

interface Video {
  _id?: string;
  name: string;
  description: string;
  uniqueCode: string;
  posterFiles?: any[],
  created_at: Date;
  updated_at: Date;
}

const VideoCrud: React.FC = () => {

  const [videos, setVideos] = useState<Video[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState<Video>({ name: '', description: '', uniqueCode: '', created_at: new Date(), updated_at: new Date() });
  const [fileData, setFileData] = useState<File | null>(null);

  // Mock function to load videos (you should replace it with your API call)
  const loadVideos = async () => {
    // Fetch videos and set them to the videos state
    const data = await getVideos(1, 60)
    if (data.isSuccess) {
      console.log(data);
      setVideos(data.results)
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleAdd = () => {
    setFormData({ name: '', description: '', uniqueCode: '', created_at: new Date(), updated_at: new Date() });
    setShowAddModal(true);
  };

  const handleEdit = (video: Video) => {
    setFormData(video);
    setSelectedVideo(video);
    setShowEditModal(true);
  };

  const handleSave = (e: any) => {
    e.preventDefault()
    // Save or update the video (you should implement this part)
    if (selectedVideo) {
      // Update video
      // Call your update API with formData
    } else {
      // Add video
      // Call your create API with formData

    }
    console.log({ formData });

    setShowAddModal(false);
    setShowEditModal(false);
    // loadVideos(); // Reload videos after adding or updating
  };

  const handleSetFile = (file: File) =>{
    setFileData(file)
  }

  const handleDelete = (video: Video) => {
    // Delete the video (you should implement this part)
    // Call your delete API with video._id
    loadVideos(); // Reload videos after deleting
  };

  return (
    <div className='container pt-3'>
      <Button onClick={handleAdd}>Add Video</Button>
      <table className="table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video, index) => (
            <tr key={video._id}>
              <td>{index + 1}</td>
              <td>
                <img src={video?.posterFiles?.[0]} width={100} />
              </td>
              <td>{video.name}</td>
              <td>{video.description}</td>
              <td>
                <Button onClick={() => handleEdit(video)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(video)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showAddModal} centered onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Add form fields for video details */}
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />

            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Video</Form.Label>
              <Form.Control
                type="file"
                onChange={(e: any) => handleSetFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} centered onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Add form fields for video details */}
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VideoCrud;
