import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { ProductFormData, ProductWithRelations } from "@/types/database"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const productSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  summary: z.string().optional(),
  description: z.string().min(1, "Descrição é obrigatória"),
  brand: z.string().optional(),
  price: z.number().min(0, "Preço deve ser maior que 0"),
  last_price: z.number().optional(),
  installments: z.number().min(1, "Parcelas deve ser maior que 0"),
  blur: z.string().optional(),
  stock: z.number().min(0, "Estoque deve ser maior ou igual a 0"),
  categories: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  flags: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  details: z.array(z.string()).optional(),
})

const categories = [
  "MEDICAMENTOS",
  "EQUIPAMENTOS", 
  "CONSUMIVEIS",
  "SUPLEMENTOS",
  "COSMETICOS",
  "HIGIENE"
]

interface ProductFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ProductFormData) => void
  product?: ProductWithRelations | null
  isLoading?: boolean
}

export function ProductForm({ isOpen, onClose, onSubmit, product, isLoading }: ProductFormProps) {
  const [categoriesList, setCategoriesList] = useState<string[]>([])
  const [sizes, setSizes] = useState<string[]>([])
  const [flags, setFlags] = useState<string[]>([])
  const [details, setDetails] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [specifications, setSpecifications] = useState<Record<string, string>>({})
  const [categoryInput, setCategoryInput] = useState("")
  const [sizeInput, setSizeInput] = useState("")
  const [flagInput, setFlagInput] = useState("")
  const [detailInput, setDetailInput] = useState("")
  const [imageInput, setImageInput] = useState("")
  const [specKey, setSpecKey] = useState("")
  const [specValue, setSpecValue] = useState("")

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product?.title || "",
      summary: product?.summary || "",
      description: product?.description || "",
      brand: product?.brand || "",
      price: product?.price ? Number(product.price) : 0,
      last_price: product?.last_price ? Number(product.last_price) : 0,
      installments: product?.installments || 12,
      blur: product?.blur || "",
      stock: product?.stock || 0,
      categories: product?.categories || [],
      images: product?.images || [],
      flags: product?.flags || [],
      sizes: product?.sizes || [],
      details: product?.details || [],
    },
  })

  // Update states when product changes
  useEffect(() => {
    setCategoriesList(product?.categories ? (product.categories as string[]) : [])
    setSizes(product?.sizes ? (product.sizes as string[]) : [])
    setFlags(product?.flags ? (product.flags as string[]) : [])
    setDetails(product?.details ? (product.details as string[]) : [])
    setImages(product?.images ? (product.images as string[]) : [])
    
    // Reset form with product data
    form.reset({
      title: product?.title || "",
      summary: product?.summary || "",
      description: product?.description || "",
      brand: product?.brand || "",
      price: product?.price ? Number(product.price) : 0,
      last_price: product?.last_price ? Number(product.last_price) : 0,
      installments: product?.installments || 12,
      blur: product?.blur || "",
      stock: product?.stock || 0,
      categories: product?.categories || [],
      images: product?.images || [],
      flags: product?.flags || [],
      sizes: product?.sizes || [],
      details: product?.details || [],
    })
  }, [product, form])

  const handleSubmit = (data: z.infer<typeof productSchema>) => {
    const formData: ProductFormData = {
      ...data,
      categories: categoriesList.length > 0 ? categoriesList : undefined,
      sizes: sizes.length > 0 ? sizes : undefined,
      flags: flags.length > 0 ? flags : undefined,
      details: details.length > 0 ? details : undefined,
      images: images.length > 0 ? images : undefined,
      specifications: Object.keys(specifications).length > 0 ? specifications : undefined,
    } as ProductFormData
    onSubmit(formData)
  }

  const addCategory = () => {
    if (categoryInput.trim() && !categoriesList.includes(categoryInput.trim())) {
      setCategoriesList([...categoriesList, categoryInput.trim()])
      setCategoryInput("")
    }
  }

  const removeCategory = (category: string) => {
    setCategoriesList(categoriesList.filter(c => c !== category))
  }

  const addSize = () => {
    if (sizeInput.trim() && !sizes.includes(sizeInput.trim())) {
      setSizes([...sizes, sizeInput.trim()])
      setSizeInput("")
    }
  }

  const removeSize = (size: string) => {
    setSizes(sizes.filter(s => s !== size))
  }

  const addFlag = () => {
    if (flagInput.trim() && !flags.includes(flagInput.trim())) {
      setFlags([...flags, flagInput.trim()])
      setFlagInput("")
    }
  }

  const removeFlag = (flag: string) => {
    setFlags(flags.filter(f => f !== flag))
  }

  const addDetail = () => {
    if (detailInput.trim() && !details.includes(detailInput.trim())) {
      setDetails([...details, detailInput.trim()])
      setDetailInput("")
    }
  }

  const removeDetail = (detail: string) => {
    setDetails(details.filter(d => d !== detail))
  }

  const addImage = () => {
    if (imageInput.trim() && !images.includes(imageInput.trim())) {
      setImages([...images, imageInput.trim()])
      setImageInput("")
    }
  }

  const removeImage = (image: string) => {
    setImages(images.filter(i => i !== image))
  }

  const addSpecification = () => {
    if (specKey.trim() && specValue.trim() && !specifications[specKey.trim()]) {
      setSpecifications({ ...specifications, [specKey.trim()]: specValue.trim() })
      setSpecKey("")
      setSpecValue("")
    }
  }

  const removeSpecification = (key: string) => {
    const newSpecs = { ...specifications }
    delete newSpecs[key]
    setSpecifications(newSpecs)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
          <DialogDescription>
            {product 
              ? "Edite as informações do produto abaixo."
              : "Preencha as informações do novo produto."
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do produto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <FormControl>
                      <Input placeholder="Marca do produto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resumo</FormLabel>
                  <FormControl>
                    <Input placeholder="Resumo breve do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descrição detalhada do produto" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço (R$)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço Anterior (R$)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estoque</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="installments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parcelas</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      placeholder="12"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 12)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <FormControl>
                      <Input placeholder="Marca do produto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="blur"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blur (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Texto de blur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Produto Ativo</Label>
              <div className="flex items-center space-x-2">
                <Switch id="active" />
                <Label htmlFor="active">Define se o produto está disponível para venda</Label>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <Label>Categorias</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar categoria"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                />
                <Button type="button" onClick={addCategory} variant="outline">
                  Adicionar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categoriesList.map((category) => (
                  <Badge key={category} variant="secondary" className="flex items-center gap-1">
                    {category}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeCategory(category)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <Label>Tamanhos</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar tamanho"
                  value={sizeInput}
                  onChange={(e) => setSizeInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())}
                />
                <Button type="button" onClick={addSize} variant="outline">
                  Adicionar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Badge key={size} variant="secondary" className="flex items-center gap-1">
                    {size}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeSize(size)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Flags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar tag"
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFlag())}
                />
                <Button type="button" onClick={addFlag} variant="outline">
                  Adicionar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {flags.map((flag) => (
                  <Badge key={flag} variant="secondary" className="flex items-center gap-1">
                    {flag}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeFlag(flag)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <Label>Detalhes</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar detalhe"
                  value={detailInput}
                  onChange={(e) => setDetailInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDetail())}
                />
                <Button type="button" onClick={addDetail} variant="outline">
                  Adicionar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {details.map((detail) => (
                  <Badge key={detail} variant="secondary" className="flex items-center gap-1">
                    {detail}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeDetail(detail)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="space-y-2">
              <Label>Imagens (URLs)</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar URL da imagem"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                />
                <Button type="button" onClick={addImage} variant="outline">
                  Adicionar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {images.map((image) => (
                  <Badge key={image} variant="secondary" className="flex items-center gap-1 max-w-[200px]">
                    <span className="truncate">{image}</span>
                    <X 
                      className="h-3 w-3 cursor-pointer flex-shrink-0" 
                      onClick={() => removeImage(image)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-2">
              <Label>Especificações</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Chave (ex: Cor)"
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecification())}
                />
                <Input
                  placeholder="Valor (ex: Azul)"
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecification())}
                />
                <Button type="button" onClick={addSpecification} variant="outline">
                  Adicionar Especificação
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(specifications).map(([key, value]) => (
                  <Badge key={key} variant="secondary" className="flex items-center gap-1">
                    <span>{key}:</span>
                    <span>{value}</span>
                    <X 
                      className="h-3 w-3 cursor-pointer flex-shrink-0" 
                      onClick={() => removeSpecification(key)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : product ? "Atualizar" : "Criar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
