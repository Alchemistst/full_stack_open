import React, { useState } from 'react';

const Blog = ({
  blog, handleLike, permission, handleDelete,
}) => {
  // State
  const [displayInfo, setDisplayInfo] = useState(false);

  // vars and consts
  const showNHide = displayInfo ? '(hide)' : '(show)';

  // Methods
  const toggleVisibility = () => {
    setDisplayInfo(!displayInfo);
  };

  return (
    <div>
      <span style={{
        fontSize: '20px',
        fontWeight: 'bold',
        marginRight: '5px',
      }}
      >
        {blog.title}
      </span>
      <span
        tabIndex="0"
        role="button"
        style={{ cursor: 'pointer' }}
        onClick={() => toggleVisibility()}
        onKeyDown={() => toggleVisibility()}
      >
        {showNHide}
      </span>
      {displayInfo
            && (
            <div>
              <div>{blog.url}</div>
              <div>
likes:
                {blog.likes}
                {' '}
                <button type="button" onClick={() => handleLike(blog)}>Like</button>
              </div>
              <div>
Added by
                {blog.user.name}
              </div>
              {permission
                    && <button type="button" onClick={() => handleDelete(blog)}>Delete</button>}
            </div>
            )}
      <hr />
    </div>
  );
};

export default Blog;
