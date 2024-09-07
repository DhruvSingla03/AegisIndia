"use client"
import { useState } from 'react';
import { FiEye, FiEyeOff, FiCopy } from 'react-icons/fi'; // Importing icons
import { toast } from 'sonner';
import { Button } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ListKeyInfoProps {
  name: string;
  value: string;
}

const ListKeyInfo = ({ name, value }: ListKeyInfoProps) => {
  const [isKeyVisible, setIsKeyVisible] = useState(false); // State for key visibility

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast("API Key copied to clipboard!");
  };

  return (
    <div>
      <div className="flex justify-between p-3 ml-2 mr-2 mt-3 text-4xl">
        <div>
            {name}
        </div>
        <div>
            <Link href="/dashboard">
                <Button className="hover:bg-slate-50 hover:text-neutral-800 bg-neutral-800">
                    Dashboard
                </Button>
            </Link>
        </div>
      </div>
      <div className="ml-5 mr-5 bg-neutral-800 rounded-md flex justify-between items-center p-3 text-lg mt-5">
        <div className="hover:bg-slate-50 hover:text-neutral-800 rounded-md p-2">
          API Key
        </div>
        <div className="flex items-center space-x-4">
          <div className={cn(isKeyVisible?"hover:bg-slate-50 hover:text-neutral-800 rounded-md p-2":"bg-inherit")}>
            {isKeyVisible ? value : '•••••••••••••••'} {/* Conditionally render key value */}
          </div>
          <Button onClick={() => setIsKeyVisible(!isKeyVisible)} className="cursor-pointer" variant="secondary">
            {isKeyVisible ? <FiEyeOff size={24} /> : <FiEye size={24} />} {/* Toggle hide/unhide icon */}
          </Button>
          <Button onClick={handleCopy} className="cursor-pointer" variant="secondary">
            <FiCopy size={24} /> {/* Copy icon */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListKeyInfo;
