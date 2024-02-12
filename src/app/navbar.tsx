"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import React from "react";
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Navbar = () => {

  const menuItems = [
    { value: "search", label: "Search", href: "/search" },
    { value: "cart", label: "Cart", href: "/commande" },
    { value: "store", label: "Store", href: "/store" },
    { value: "home", label: "Home", href: "/" },
  ];

  return (
    <nav className="border-b shadow-md py-4 fixed w-full top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div>
          <Menu>
            {({ open }) => (
              <>
                <Menu.Button>Menu</Menu.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Menu.Items static className="origin-top absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {menuItems.map((item) => (
                        <Menu.Item key={item.value}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              className={`${active ? 'bg-blue-500 text-white' : 'text-gray-700'
                                } block px-4 py-2 text-sm`}
                            >
                              {item.label}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
        <Link href="/">ESHOP</Link>
        <div className="flex items-center">
          <Link href="/commande">
            <div className="flex items-center">
              <ShoppingCart className="mr-5" />
            </div>
          </Link>
          <Link href="/search">
            <div className="flex items-center">
              <FaSearch className="mr-5" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;