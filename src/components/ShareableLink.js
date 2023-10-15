import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const ShareableLink = () => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleClick = () => {
    const urlWithQuery = window.location.href;
    const url = new URL(urlWithQuery);
    navigator.clipboard.writeText(urlWithQuery);

    setIsLinkCopied(true);

    setTimeout(() => {
      setIsLinkCopied(false);
    }, 3000);
  }

  return (
    <div>
      <Button
        onClick={handleClick}
        variant={isLinkCopied ? "success" : "outline-warning"}
      >
        {isLinkCopied ? "Link Copied" : "Copy Shareable Link"}
      </Button>
    </div>
  );
}

export default ShareableLink;
