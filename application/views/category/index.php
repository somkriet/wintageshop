<!doctype html>
<html class="fixed sidebar-light">
<head>
    <?php $this->load->view('layouts/head') ?>
</head>
<body>

<section class="body">
    <?php $this->load->view('layouts/header') ?>
    <div class="inner-wrapper">
        <?php $this->load->view('layouts/sidebar') ?>
        <section role="main" class="content-body">
            <header class="page-header">
                <h2>Product</h2>
            </header>

            <!-- start: page -->
            <div class="row">
                <div class="col">
                    <section class="card">
                        <header class="card-header">
                            <div class="card-actions">
                            </div>

                            <h2 class="card-title">Products</h2>
                        </header>
                        <div class="card-body">
                            <table class="table table-bordered mb-0" id="datatable-default">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name TH</th>
                                    <th>Name EN</th>
                                    <th>Slug</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php //foreach ($product_category as $index => $category): ?>
                                    <!-- <tr>
                                        <td><?php echo $index + 1 ?></td>
                                        <td><?php echo $category->name_th ?></td>
                                        <td><?php echo $category->name_en ?></td>
                                        <td><?php echo $category->url_slug ?></td>
                                        <td><?php echo $category->created_at ?></td>
                                        <td><?php echo $category->updated_at ?></td>
                                        <td class="actions">
                                            <a href="<?php echo base_url("/cms/product/category/edit/" . $category->id) ?>" class="btn btn-default btn-xs"><i class="fa fa-pencil"></i> Edit</a>
                                            <a href="<?php echo base_url("/cms/product/category/delete/" . $category->id) ?>" class="delete-row btn btn-default btn-xs"><i class="fa fa-trash-o"></i> Delete</a>
                                        </td>
                                    </tr> -->
                                <?php// endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
            <!-- end: page -->
        </section>
    </div>
</section>

<?php $this->load->view('layouts/footer') ?>

</body>
</html>