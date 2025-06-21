'use client';

import React, { useState } from 'react';
import ClientImage, { ClientImageSimple } from './ClientImage';
import ImageWithLoading from './ImageWithLoading';
import { useAssetPath, useAssetPaths, getClientAssetPath } from '../lib/useAssetPath';

/**
 * 客户端图片使用示例组件
 * 演示各种在客户端组件中处理GitHub Pages baseUrl的方法
 */
const ClientImageExample: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 示例图片路径数组
  const imagePaths = [
    '/images/avatar.jpg',
    '/images/projects/homepage.jpg',
    '/images/books/clean-code.jpg'
  ];

  // 方法1: 使用Hook处理单个路径
  const singleImagePath = useAssetPath(imagePaths[currentImageIndex]);

  // 方法2: 使用Hook处理多个路径
  const processedImagePaths = useAssetPaths(imagePaths);

  // 方法3: 使用函数直接处理路径
  const directProcessedPath = getClientAssetPath(imagePaths[currentImageIndex]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagePaths.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imagePaths.length) % imagePaths.length);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          客户端图片路径处理示例
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          演示在客户端组件中如何处理GitHub Pages部署时的baseUrl路径问题
        </p>
      </div>

      {/* 方法1: 使用专门的ClientImage组件 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          方法1: 使用ClientImage组件（推荐）
        </h3>
        <div className="flex justify-center">
          <ClientImage
            src={imagePaths[currentImageIndex]}
            alt="示例图片"
            width={200}
            height={200}
            className="rounded-lg shadow-md"
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          自动处理路径，支持GitHub Pages部署
        </p>
      </div>

      {/* 方法2: 使用ClientImageSimple组件 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          方法2: 使用ClientImageSimple组件（高性能）
        </h3>
        <div className="flex justify-center">
          <ClientImageSimple
            src={imagePaths[currentImageIndex]}
            alt="示例图片"
            width={200}
            height={200}
            className="rounded-lg shadow-md"
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          使用函数处理路径，性能更好
        </p>
      </div>

      {/* 方法3: 使用ImageWithLoading组件的autoProcessPath属性 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          方法3: 使用ImageWithLoading组件的autoProcessPath属性
        </h3>
        <div className="flex justify-center">
          <ImageWithLoading
            src={imagePaths[currentImageIndex]}
            alt="示例图片"
            width={200}
            height={200}
            className="rounded-lg shadow-md"
            autoProcessPath={true}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          在原有组件基础上增加路径处理功能
        </p>
      </div>

      {/* 方法4: 使用Hook手动处理路径 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          方法4: 使用useAssetPath Hook手动处理
        </h3>
        <div className="flex justify-center">
          <img
            src={singleImagePath}
            alt="示例图片"
            className="w-48 h-48 object-cover rounded-lg shadow-md"
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          手动使用Hook处理路径: {singleImagePath}
        </p>
      </div>

      {/* 方法5: 批量处理路径 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          方法5: 使用useAssetPaths Hook批量处理
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {processedImagePaths.map((path, index) => (
            <div key={index} className="text-center">
              <img
                src={path}
                alt={`示例图片 ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg shadow-md"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                {path}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={prevImage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          上一张
        </button>
        <button
          onClick={nextImage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          下一张
        </button>
      </div>

      {/* 路径信息展示 */}
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">路径处理信息:</h4>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">原始路径:</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">{imagePaths[currentImageIndex]}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Hook处理后:</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">{singleImagePath}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">函数处理后:</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">{directProcessedPath}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientImageExample; 