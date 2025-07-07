// const filterByCategory = (products, category) => {
//     if (!category || category.toLowerCase() === "both") return products;
  
//     // Extract meaningful keywords from input
//     const keywords = category.toLowerCase().match(/\b\w+\b/g) || []; // Extract words (ignores special characters)
//     if (keywords.length === 0) return products;
  
//     const filtered = products
//       .map((product) => {
//         let matchCount = 0;
  
//         // Normalize product properties for comparison
//         const frameShape = product.frame_shape?.toLowerCase() || "";
//         const frameType = product.frem_type?.toLowerCase() || "";
//         const gender = product.gender?.toLowerCase() || "";
//         const highlights = product.highlights?.toLowerCase() || "";
//         let frameColor = "";
  
//         // Handle frameColor as a JSON array
//         if (product.frameColor) {
//           try {
//             const parsedColors = JSON.parse(product.frameColor);
//             if (Array.isArray(parsedColors)) {
//               frameColor = parsedColors
//                 .map((colorObj) => Object.keys(colorObj)[0].trim().toLowerCase())
//                 .join(" ");
//             }
//           } catch (error) {
//             console.error("Error parsing frameColor:", product.frameColor, error);
//           }
//         }
  
//         // Check if any keyword matches any product attributes
//         keywords.forEach((keyword) => {
//           if (
//             frameShape.includes(keyword) ||
//             frameType.includes(keyword) ||
//             gender.includes(keyword) ||
//             highlights.includes(keyword) ||
//             frameColor.includes(keyword)
//           ) {
//             matchCount++;
//           }
//         });
  
//         return matchCount > 0 ? { product, matchCount } : null;
//       })
//       .filter(Boolean) // Remove null values
//       .sort((a, b) => b.matchCount - a.matchCount) // Sort by highest match count
//       .map((item) => item.product);
  
//     return filtered.length ? filtered : allProducts;
//   };
  
//   useEffect(() => {
//     const filterProducts = () => {
//       let updatedFilter = filterByCategory(allProducts, category); // Start with category-based filtering
  
//       // **Filter by Frame Type**
//       if (selectedFrameType.length > 0) {
//         updatedFilter = updatedFilter.filter((product) =>
//           selectedFrameType.some(
//             (frame) => frame.replace(/\s+/g, "").toLowerCase() === product.frem_type?.replace(/\s+/g, "").toLowerCase()
//           )
//         );
//       }
  
//       // **Filter by Frame Shape**
//       if (selectedFrameShape.length > 0) {
//         updatedFilter = updatedFilter.filter((product) =>
//           selectedFrameShape.some(
//             (shape) => shape.replace(/\s+/g, "").toLowerCase() === product.frame_shape?.replace(/\s+/g, "").toLowerCase()
//           )
//         );
//       }
  
//       // **Filter by Gender**
//       if (selectedGender.length > 0) {
//         updatedFilter = updatedFilter.filter((product) =>
//           selectedGender.some(
//             (gender) => gender.trim().toLowerCase() === product.gender?.trim().toLowerCase()
//           )
//         );
//       }
  
//       // **Filter by Lens Color**
//       if (selectedLensColor.length > 0) {
//         updatedFilter = updatedFilter.filter((product) => {
//           if (!product.lenshColor) return false;
//           try {
//             const lensColorsArray = JSON.parse(product.lenshColor);
//             const productLensColors = lensColorsArray.map((colorObj) => Object.keys(colorObj)[0].trim().toLowerCase());
//             return selectedLensColor.some((color) => productLensColors.includes(color.trim().toLowerCase()));
//           } catch (error) {
//             console.error("Error parsing lens_color:", product.lenshColor, error);
//             return false;
//           }
//         });
//       }
  
//       // **Filter by Frame Color**
//       if (selectedFrameColor.length > 0) {
//         updatedFilter = updatedFilter.filter((product) => {
//           if (!product.frameColor) return false;
//           try {
//             const frameColorsArray = JSON.parse(product.frameColor);
//             const productFrameColors = frameColorsArray.map((colorObj) => Object.keys(colorObj)[0].trim().toLowerCase());
//             return selectedFrameColor.some((color) => productFrameColors.includes(color.trim().toLowerCase()));
//           } catch (error) {
//             console.error("Error parsing frameColor:", product.frameColor, error);
//             return false;
//           }
//         });
//       }
  
//       // **Filter by Price Range**
//       updatedFilter = updatedFilter.filter((product) => {
//         return product.product_price >= minPrice && product.product_price <= maxPrice;
//       });
  
//       // **Remove duplicates by product ID**
//       const uniqueProducts = updatedFilter.reduce((acc, product) => {
//         if (!acc.some((uniqueProduct) => uniqueProduct.product_id === product.product_id)) {
//           acc.push(product);
//         }
//         return acc;
//       }, []);
  
//       console.log("Final Filtered Products:", uniqueProducts);
//       setFilteredProducts(uniqueProducts.length > 0 ? uniqueProducts : allProducts);
//       setCurrentPage(1);
//     };
  
//     filterProducts();
//   }, [selectedFrameType, selectedFrameShape, selectedGender, selectedFrameColor, minPrice, maxPrice, selectedLensColor, allProducts, category]);
  