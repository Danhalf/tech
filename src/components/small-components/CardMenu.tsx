import * as React from 'react';
import { useState } from 'react';

interface CardMenuProps {
  id: number;
  uid: string;
}

export default function CardMenu({ id, uid }: CardMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={openMenu}
      >
        Get data
      </button>
    </div>
  );
}
