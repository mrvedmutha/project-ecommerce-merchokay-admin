'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Search,
  ChevronDown,
  Eye,
  Package,
  AlertCircle,
  ExternalLink,
  Download,
  Edit,
  Trash2,
  MoreHorizontal,
} from 'lucide-react';
import Image from 'next/image';
import { Product, ProductFilters } from '@/types/product';
import { ProductTableSkeleton } from '@/components/product/ProductTableSkeleton';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductsData {
  products: Product[];
  collections: Array<{ _id: string; name: string; status: string }>;
  total: number;
}

export default function ProductsPage() {
  const [productsData, setProductsData] = useState<ProductsData>({
    products: [],
    collections: [],
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<ProductFilters>({
    status: 'all',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status && filters.status !== 'all')
        params.append('status', filters.status);
      if (filters.search) params.append('search', filters.search);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
      params.append('page', currentPage.toString());
      params.append('limit', itemsPerPage.toString());

      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();
      setProductsData(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage, itemsPerPage]);

  // Fetch products when filters or pagination changes
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setFilters(prev => ({
      ...prev,
      status:
        value === 'all' ? 'all' : (value as 'active' | 'draft' | 'archived'),
    }));
    setSelectedProducts([]);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  const handleSearchSubmit = () => {
    setFilters(prev => ({ ...prev, search: searchInput.trim() }));
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setFilters(prev => ({ ...prev, search: '' }));
    setCurrentPage(1);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setFilters(prev => ({
      ...prev,
      sortBy: sortBy as
        | 'name'
        | 'createdAt'
        | 'updatedAt'
        | 'inventory.quantity'
        | 'category'
        | 'vendor',
      sortOrder,
    }));
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === productsData.products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(productsData.products.map(p => p._id));
    }
  };

  const getCollectionNames = (collectionIds: string[] = []) => {
    return collectionIds.map(
      id => productsData.collections.find(c => c._id === id)?.name || id
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      draft: 'secondary',
      archived: 'outline',
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getInventoryStatus = (quantity: number, lowStockAlert: number) => {
    if (quantity === 0) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Out of Stock
        </Badge>
      );
    } else if (quantity <= lowStockAlert) {
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Low Stock ({quantity})
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Package className="w-3 h-3" />
          In Stock ({quantity})
        </Badge>
      );
    }
  };

  // Pagination handlers
  const totalPages = Math.ceil(productsData.total / itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  // Bulk action handlers
  const handleBulkStatusChange = async (
    newStatus: 'active' | 'draft' | 'archived'
  ) => {
    // TODO: Implement API call to update selected products status
    console.log(`Updating ${selectedProducts.length} products to ${newStatus}`);
    // After successful update, refetch products
    await fetchProducts();
  };

  const handleBulkExport = () => {
    // TODO: Implement export functionality
    console.log(`Exporting ${selectedProducts.length} products`);
  };

  const handleBulkEdit = () => {
    // TODO: Navigate to bulk edit page
    console.log(`Bulk editing ${selectedProducts.length} products`);
  };

  const handleBulkDelete = async () => {
    // TODO: Implement bulk delete with confirmation
    console.log(`Deleting ${selectedProducts.length} products`);
  };

  if (loading) {
    return <ProductTableSkeleton />;
  }

  return (
    <div className="space-y-6 p-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and inventory
          </p>
        </div>
        <Button>Add Product</Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Tabs for Status Filter */}
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full lg:w-auto"
            >
              <TabsList className="grid w-full grid-cols-4 lg:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
              {/* Search */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products... (Press Enter)"
                    value={searchInput}
                    onChange={e => handleSearchInputChange(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    className="pl-8 w-full sm:w-[300px]"
                  />
                </div>
                {filters.search ? (
                  <Button
                    onClick={handleClearSearch}
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                  >
                    Clear
                  </Button>
                ) : (
                  <Button
                    onClick={handleSearchSubmit}
                    variant="outline"
                    size="sm"
                    className="gap-2 shrink-0"
                    disabled={!searchInput.trim()}
                  >
                    <Search className="w-4 h-4" />
                    <span className="hidden sm:inline">Search</span>
                  </Button>
                )}
              </div>

              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2 w-full sm:w-auto justify-center sm:justify-start"
                  >
                    <span className="hidden sm:inline">Sort</span>
                    <span className="sm:hidden">Sort Products</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleSort('name', 'asc')}>
                    Product title A-Z
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort('name', 'desc')}>
                    Product title Z-A
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleSort('createdAt', 'desc')}
                  >
                    Created (Newer First)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleSort('createdAt', 'asc')}
                  >
                    Created (Older First)
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleSort('updatedAt', 'desc')}
                  >
                    Updated (Newer First)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleSort('updatedAt', 'asc')}
                  >
                    Updated (Older First)
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleSort('inventory.quantity', 'desc')}
                  >
                    Inventory (High to Low)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleSort('inventory.quantity', 'asc')}
                  >
                    Inventory (Low to High)
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleSort('category', 'asc')}
                  >
                    Product Type A-Z
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort('vendor', 'asc')}>
                    Vendor A-Z
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions - Show when products are selected */}
      {selectedProducts.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-blue-700">
                {selectedProducts.length} product
                {selectedProducts.length !== 1 ? 's' : ''} selected
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkExport}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Selected
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkEdit}
                  className="gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Bulk Edit
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <MoreHorizontal className="w-4 h-4" />
                      Quick Actions
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleBulkStatusChange('active')}
                    >
                      Set to Active
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleBulkStatusChange('draft')}
                    >
                      Set to Draft
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleBulkStatusChange('archived')}
                    >
                      Set to Archived
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleBulkDelete}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products Table */}
      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedProducts.length ===
                        productsData.products.length &&
                      productsData.products.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-20">Image</TableHead>
                <TableHead>Product Title</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Collections</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productsData.products.map(product => (
                <TableRow key={product._id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProducts.includes(product._id)}
                      onCheckedChange={() => handleSelectProduct(product._id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="w-12 h-12 relative rounded-md overflow-hidden bg-gray-100">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.images[0].alt}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        SKU: {product.sku}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getInventoryStatus(
                      product.inventory.quantity,
                      product.inventory.lowStockAlert
                    )}
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    {product.collections && product.collections.length > 0 ? (
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button
                            variant="link"
                            className="p-0 h-auto font-normal"
                          >
                            {product.collections.length} collection
                            {product.collections.length !== 1 ? 's' : ''}
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold">
                              Collections
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {getCollectionNames(product.collections).map(
                                (collectionName, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {collectionName}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ) : (
                      <span className="text-muted-foreground">
                        No collections
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      Preview
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {productsData.products.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-4">
                {filters.search
                  ? `No products match your search for "${filters.search}"`
                  : 'Get started by adding your first product'}
              </p>
              {!filters.search && <Button>Add Your First Product</Button>}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {productsData.products.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              <span className="hidden sm:inline">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, productsData.total)} of{' '}
                {productsData.total} products
              </span>
              <span className="sm:hidden">{productsData.total} products</span>
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Select
                value={itemsPerPage.toString()}
                onValueChange={handleItemsPerPageChange}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">per page</span>
            </div>
          </div>

          <Pagination className="mx-auto sm:mx-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={
                    currentPage === 1
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>

              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                const pageNum =
                  Math.max(1, Math.min(totalPages - 2, currentPage - 1)) + i;
                if (pageNum > totalPages) return null;

                return (
                  <PaginationItem
                    key={pageNum}
                    className="hidden sm:inline-flex"
                  >
                    <PaginationLink
                      onClick={() => handlePageChange(pageNum)}
                      isActive={pageNum === currentPage}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {/* Mobile: Show current page */}
              <PaginationItem className="sm:hidden">
                <PaginationLink isActive className="cursor-default">
                  {currentPage} of {totalPages}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
